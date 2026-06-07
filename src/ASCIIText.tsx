import { useEffect, useRef } from "react";
import * as THREE from "three";

type ASCIITextProps = {
  text?: string;
  enableWaves?: boolean;
  asciiFontSize?: number;
  textFontSize?: number;
  planeBaseHeight?: number;
  textColor?: string;
};

type AsciiOptions = {
  fontSize?: number;
  fontFamily?: string;
  charset?: string;
  invert?: boolean;
};

type CanvasTextOptions = {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
};

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uEnableWaves;

void main() {
  vUv = uv;
  float time = uTime * 5.;
  float waveFactor = uEnableWaves;
  vec3 transformed = position;
  transformed.x += sin(time + position.y) * 0.5 * waveFactor;
  transformed.y += cos(time + position.z) * 0.15 * waveFactor;
  transformed.z += sin(time + position.x) * waveFactor;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
  float time = uTime;
  vec2 pos = vUv;
  float r = texture2D(uTexture, pos + cos(time * 2. - time + pos.x) * .01).r;
  float g = texture2D(uTexture, pos + tan(time * .5 + pos.x - time) * .01).g;
  float b = texture2D(uTexture, pos - cos(time * 2. + time + pos.y) * .01).b;
  float a = texture2D(uTexture, pos).a;
  gl_FragColor = vec4(r, g, b, a);
}
`;

const PX_RATIO = typeof window !== "undefined" ? window.devicePixelRatio : 1;
const ASCII_CHARSET =
  " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function mapRange(n: number, start: number, stop: number, start2: number, stop2: number) {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
}

class AsciiFilter {
  renderer: THREE.WebGLRenderer;
  domElement: HTMLDivElement;
  pre: HTMLPreElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width = 0;
  height = 0;
  cols = 0;
  rows = 0;
  deg = 0;
  invert: boolean;
  fontSize: number;
  fontFamily: string;
  charset: string;
  center = { x: 0, y: 0 };
  mouse = { x: 0, y: 0 };

  constructor(renderer: THREE.WebGLRenderer, options: AsciiOptions = {}) {
    this.renderer = renderer;
    this.domElement = document.createElement("div");
    this.domElement.style.position = "absolute";
    this.domElement.style.inset = "0";
    this.domElement.style.width = "100%";
    this.domElement.style.height = "100%";
    this.domElement.style.pointerEvents = "none";

    this.pre = document.createElement("pre");
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.domElement.appendChild(this.canvas);

    this.invert = options.invert ?? true;
    this.fontSize = options.fontSize ?? 12;
    this.fontFamily = options.fontFamily ?? "'Courier New', monospace";
    this.charset = options.charset ?? ASCII_CHARSET;

    this.context.imageSmoothingEnabled = false;
    this.onMouseMove = this.onMouseMove.bind(this);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.reset();
    this.center = { x: width / 2, y: height / 2 };
    this.mouse = { x: this.center.x, y: this.center.y };
  }

  reset() {
    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    const charWidth = this.context.measureText("A").width || this.fontSize;
    this.cols = Math.floor(this.width / (this.fontSize * (charWidth / this.fontSize)));
    this.rows = Math.floor(this.height / this.fontSize);
    this.canvas.width = this.cols;
    this.canvas.height = this.rows;
    this.pre.style.fontFamily = this.fontFamily;
    this.pre.style.fontSize = `${this.fontSize}px`;
    this.pre.style.margin = "0";
    this.pre.style.padding = "0";
    this.pre.style.lineHeight = "1em";
    this.pre.style.position = "absolute";
    this.pre.style.left = "0";
    this.pre.style.top = "0";
    this.pre.style.zIndex = "9";
    this.pre.style.backgroundAttachment = "fixed";
    this.pre.style.mixBlendMode = "difference";
  }

  render(scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer.render(scene, camera);
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.context.clearRect(0, 0, w, h);
    if (w && h) {
      this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
    }
    this.asciify(this.context, w, h);
    this.hue();
  }

  onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX * PX_RATIO, y: event.clientY * PX_RATIO };
  }

  hue() {
    const dx = this.mouse.x - this.center.x;
    const dy = this.mouse.y - this.center.y;
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    this.deg += (deg - this.deg) * 0.075;
    this.domElement.style.filter = `hue-rotate(${this.deg.toFixed(1)}deg)`;
  }

  asciify(ctx: CanvasRenderingContext2D, w: number, h: number) {
    if (!w || !h) return;
    const imgData = ctx.getImageData(0, 0, w, h).data;
    let str = "";
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = x * 4 + y * 4 * w;
        const [r, g, b, a] = [imgData[i], imgData[i + 1], imgData[i + 2], imgData[i + 3]];
        if (a === 0) {
          str += " ";
          continue;
        }
        const gray = (0.3 * r + 0.6 * g + 0.1 * b) / 255;
        let idx = Math.floor((1 - gray) * (this.charset.length - 1));
        if (this.invert) idx = this.charset.length - idx - 1;
        str += this.charset[idx];
      }
      str += "\n";
    }
    this.pre.textContent = str;
  }

  dispose() {
    document.removeEventListener("mousemove", this.onMouseMove);
  }
}

class CanvasTxt {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  txt: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  font: string;

  constructor(txt: string, options: CanvasTextOptions = {}) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.txt = txt;
    this.fontSize = options.fontSize ?? 200;
    this.fontFamily = options.fontFamily ?? "Arial";
    this.color = options.color ?? "#fdf9f3";
    this.font = `600 ${this.fontSize}px ${this.fontFamily}`;
  }

  resize() {
    this.context.font = this.font;
    const lines = this.txt.split("\n");
    const measurements = lines.map((line) => this.context.measureText(line));
    const width = Math.max(...measurements.map((metrics) => metrics.width));
    const ascent = Math.max(...measurements.map((metrics) => metrics.actualBoundingBoxAscent));
    const descent = Math.max(...measurements.map((metrics) => metrics.actualBoundingBoxDescent));
    const lineHeight = (ascent + descent) * 1.18;
    this.canvas.width = Math.ceil(width) + 20;
    this.canvas.height = Math.ceil(lineHeight * lines.length) + 20;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = this.color;
    this.context.font = this.font;
    this.context.textAlign = "center";
    const lines = this.txt.split("\n");
    const metrics = this.context.measureText(this.txt.replace(/\n/g, ""));
    const lineHeight =
      (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || this.fontSize) * 1.18;
    const firstBaseline = 10 + metrics.actualBoundingBoxAscent;
    lines.forEach((line, index) => {
      this.context.fillText(line, this.canvas.width / 2, firstBaseline + index * lineHeight);
    });
  }

  get texture() {
    return this.canvas;
  }
}

class CanvAscii {
  textString: string;
  asciiFontSize: number;
  textFontSize: number;
  textColor: string;
  planeBaseHeight: number;
  container: HTMLDivElement;
  width: number;
  height: number;
  enableWaves: boolean;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  mouse: { x: number; y: number };
  center = { x: 0, y: 0 };
  textCanvas!: CanvasTxt;
  texture!: THREE.CanvasTexture;
  geometry!: THREE.PlaneGeometry;
  material!: THREE.ShaderMaterial;
  mesh!: THREE.Mesh;
  renderer!: THREE.WebGLRenderer;
  filter!: AsciiFilter;
  animationFrameId = 0;

  constructor(
    props: Required<ASCIITextProps>,
    containerElem: HTMLDivElement,
    width: number,
    height: number,
  ) {
    this.textString = props.text;
    this.asciiFontSize = props.asciiFontSize;
    this.textFontSize = props.textFontSize;
    this.textColor = props.textColor;
    this.planeBaseHeight = props.planeBaseHeight;
    this.container = containerElem;
    this.width = width;
    this.height = height;
    this.enableWaves = props.enableWaves;
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
    this.camera.position.z = 30;
    this.scene = new THREE.Scene();
    this.mouse = { x: this.width / 2, y: this.height / 2 };
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  async init() {
    try {
      await document.fonts.load('600 200px "IBM Plex Mono"');
      await document.fonts.load('500 12px "IBM Plex Mono"');
    } catch {
      // Continue with fallback if font loading fails.
    }
    await document.fonts.ready;
    this.setMesh();
    this.setRenderer();
  }

  setMesh() {
    this.textCanvas = new CanvasTxt(this.textString, {
      fontSize: this.textFontSize,
      fontFamily: "IBM Plex Mono",
      color: this.textColor,
    });
    this.textCanvas.resize();
    this.textCanvas.render();

    this.texture = new THREE.CanvasTexture(this.textCanvas.texture);
    this.texture.minFilter = THREE.NearestFilter;
    const textAspect = this.textCanvas.canvas.width / this.textCanvas.canvas.height;
    const planeH = this.planeBaseHeight;
    const planeW = planeH * textAspect;

    this.geometry = new THREE.PlaneGeometry(planeW, planeH, 36, 36);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: this.enableWaves ? 1.0 : 0.0 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);
    this.filter = new AsciiFilter(this.renderer, {
      fontFamily: "IBM Plex Mono",
      fontSize: this.asciiFontSize,
      invert: true,
    });
    this.container.appendChild(this.filter.domElement);
    this.setSize(this.width, this.height);
    this.container.addEventListener("mousemove", this.onMouseMove);
    this.container.addEventListener("touchmove", this.onMouseMove);
  }

  setSize(w: number, h: number) {
    this.width = w;
    this.height = h;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.filter.setSize(w, h);
    this.center = { x: w / 2, y: h / 2 };
  }

  load() {
    const animateFrame = () => {
      this.animationFrameId = requestAnimationFrame(animateFrame);
      this.render();
    };
    animateFrame();
  }

  onMouseMove(evt: MouseEvent | TouchEvent) {
    const e = "touches" in evt ? evt.touches[0] : evt;
    const bounds = this.container.getBoundingClientRect();
    this.mouse = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  }

  render() {
    const time = new Date().getTime() * 0.001;
    this.textCanvas.render();
    this.texture.needsUpdate = true;
    this.material.uniforms.uTime.value = Math.sin(time);
    this.updateRotation();
    this.filter.render(this.scene, this.camera);
  }

  updateRotation() {
    const x = mapRange(this.mouse.y, 0, this.height, 0.5, -0.5);
    const y = mapRange(this.mouse.x, 0, this.width, -0.5, 0.5);
    this.mesh.rotation.x += (x - this.mesh.rotation.x) * 0.05;
    this.mesh.rotation.y += (y - this.mesh.rotation.y) * 0.05;
  }

  clear() {
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((material) => material.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
    this.scene.clear();
  }

  dispose() {
    cancelAnimationFrame(this.animationFrameId);
    if (this.filter) {
      this.filter.dispose();
      this.filter.domElement.remove();
    }
    this.container.removeEventListener("mousemove", this.onMouseMove);
    this.container.removeEventListener("touchmove", this.onMouseMove);
    this.clear();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }
}

export default function ASCIIText({
  text = "Hello World!",
  asciiFontSize = 12,
  textFontSize = 200,
  textColor = "#fdf9f3",
  planeBaseHeight = 8,
  enableWaves = true,
}: ASCIITextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<CanvAscii | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const createAndInit = async (container: HTMLDivElement, width: number, height: number) => {
      const instance = new CanvAscii(
        { text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves },
        container,
        width,
        height,
      );
      await instance.init();
      return instance;
    };

    const setup = async () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();

      if (width === 0 || height === 0) {
        observer = new IntersectionObserver(
          async ([entry]) => {
            if (cancelled || !containerRef.current) return;
            if (
              entry.isIntersecting &&
              entry.boundingClientRect.width > 0 &&
              entry.boundingClientRect.height > 0
            ) {
              const { width: w, height: h } = entry.boundingClientRect;
              observer?.disconnect();
              observer = null;
              asciiRef.current = await createAndInit(containerRef.current, w, h);
              if (!cancelled) asciiRef.current.load();
            }
          },
          { threshold: 0.1 },
        );
        observer.observe(containerRef.current);
        return;
      }

      asciiRef.current = await createAndInit(containerRef.current, width, height);
      if (!cancelled && asciiRef.current) {
        asciiRef.current.load();
        resizeObserver = new ResizeObserver((entries) => {
          if (!entries[0] || !asciiRef.current) return;
          const { width: w, height: h } = entries[0].contentRect;
          if (w > 0 && h > 0) asciiRef.current.setSize(w, h);
        });
        resizeObserver.observe(containerRef.current);
      }
    };

    setup();

    return () => {
      cancelled = true;
      observer?.disconnect();
      resizeObserver?.disconnect();
      asciiRef.current?.dispose();
      asciiRef.current = null;
    };
  }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);

  return <div ref={containerRef} className="ascii-text-container" />;
}
