import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Lenis } from "../_libs/lenis.mjs";
import { C as Canvas, u as useFrame } from "../_libs/react-three__fiber.mjs";
import { m as motion, u as useScroll, a as useSpring, b as useTransform } from "../_libs/framer-motion.mjs";
import { G as GraduationCap, B as BookOpen, S as Stethoscope, A as Award, M as Mic, a as Activity, H as HeartPulse, b as Sparkles, c as ShieldCheck, d as Brain, e as ArrowUpRight, f as MapPin, C as Clock, P as Phone, g as Sun, h as Moon } from "../_libs/lucide-react.mjs";
import { e as Color, k as AdditiveBlending } from "../_libs/three.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  if (!mounted) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: fallback });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
function SmoothScroll() {
  reactExports.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
function Particles({ count = 4500, isDark }) {
  const ref = reactExports.useRef(null);
  const mouse = reactExports.useRef({ x: 0, y: 0 });
  const { positions, colors } = reactExports.useMemo(() => {
    const positions2 = new Float32Array(count * 3);
    const colors2 = new Float32Array(count * 3);
    const c1 = new Color(isDark ? "#7fd4ff" : "#3a7fb8");
    const c2 = new Color(isDark ? "#a8e6ff" : "#5a9bd4");
    const c3 = new Color(isDark ? "#ffffff" : "#2a5a8a");
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 14;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions2[i * 3] = r * Math.sin(p) * Math.cos(t);
      positions2[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      positions2[i * 3 + 2] = r * Math.cos(p);
      const mix = Math.random();
      const col = mix < 0.5 ? c1 : mix < 0.85 ? c2 : c3;
      colors2[i * 3] = col.r;
      colors2[i * 3 + 1] = col.g;
      colors2[i * 3 + 2] = col.b;
    }
    return { positions: positions2, colors: colors2 };
  }, [count, isDark]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.2) * 0.3;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    ref.current.rotation.z = mouse.current.x * 0.15;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("points", { ref, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("bufferGeometry", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-position", args: [positions, 3] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("bufferAttribute", { attach: "attributes-color", args: [colors, 3] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pointsMaterial",
      {
        size: 0.025,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: isDark ? 0.85 : 0.55,
        depthWrite: false,
        blending: AdditiveBlending
      }
    )
  ] });
}
function FloatingRings({ isDark }) {
  const g = reactExports.useRef(null);
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.rotation.x = Math.sin(t * 0.15) * 0.4;
    g.current.rotation.y = t * 0.05;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { ref: g, children: [2.5, 3.4, 4.6].map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { rotation: [Math.PI / 2 + i * 0.2, i * 0.4, 0], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("torusGeometry", { args: [r, 4e-3, 16, 200] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("meshBasicMaterial", { color: isDark ? "#9fdcff" : "#4a8fc8", transparent: true, opacity: (isDark ? 0.25 : 0.18) - i * 0.05 })
  ] }, i)) });
}
function BackgroundScene() {
  const [isDark, setIsDark] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 -z-10 pointer-events-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: "radial-gradient(ellipse at center, var(--bg-grad-from) 0%, var(--bg-grad-to) 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Canvas,
      {
        camera: { position: [0, 0, 8], fov: 60 },
        gl: { antialias: true, alpha: true, powerPreference: "high-performance" },
        dpr: [1, 1.6],
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [10, 10, 10], intensity: 1, color: isDark ? "#7fd4ff" : "#4a8fc8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Particles, { isDark }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingRings, { isDark })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0",
        style: {
          background: "linear-gradient(180deg, color-mix(in oklab, var(--background) 50%, transparent) 0%, transparent 30%, transparent 70%, color-mix(in oklab, var(--background) 60%, transparent) 100%)"
        }
      }
    )
  ] });
}
function useThemeInit() {
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
}
function ThemeToggle() {
  const [isDark, setIsDark] = reactExports.useState(true);
  reactExports.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": "Toggle theme",
      className: "glass rounded-full h-9 w-9 grid place-items-center text-foreground/80 hover:text-primary transition",
      children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { size: 15 })
    }
  );
}
function SectionQuestion() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const z = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0]);
  const lineW = useTransform(scrollYProgress, [0, 0.5], ["30%", "100%"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative h-[200vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 flex h-screen items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        style: { scale, opacity, z, transformPerspective: 1200 },
        className: "px-6 text-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] text-aurora", children: [
          "Every diagnosis",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "begins with a question."
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[min(80vw,720px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { width: lineW }, className: "relative h-px overflow-visible", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heartbeat, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollHint, {})
  ] }) });
}
function Heartbeat() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 600 60", className: "w-full h-12", preserveAspectRatio: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "hb", x1: "0", x2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#7fd4ff", stopOpacity: "0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0.5", stopColor: "#7fd4ff" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#7fd4ff", stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.path,
      {
        d: "M0 30 L120 30 L150 30 L165 10 L185 50 L205 20 L225 40 L245 30 L600 30",
        stroke: "url(#hb)",
        strokeWidth: "1.5",
        fill: "none",
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }
      }
    )
  ] });
}
function ScrollHint() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 0.6, y: 0 },
      transition: { delay: 1.5, duration: 1 },
      className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scroll" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { y: [0, 8, 0] },
            transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            className: "h-8 w-px bg-gradient-to-b from-foreground/40 to-transparent"
          }
        )
      ]
    }
  );
}
const PATIENT_WORDS = [
  { text: "Symptoms", depth: 0.2 },
  { text: "Lifestyle", depth: 0.6 },
  { text: "History", depth: 0.4 },
  { text: "Nutrition", depth: 0.8 },
  { text: "Stress", depth: 0.3 },
  { text: "Sleep", depth: 0.7 },
  { text: "Patterns", depth: 0.5 },
  { text: "Family", depth: 0.9 },
  { text: "Habits", depth: 0.25 }
];
function SectionPatient() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const silhouette = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative h-[220vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 flex h-screen items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        style: { opacity: silhouette, scale: useTransform(silhouette, [0, 1], [0.8, 1]) },
        className: "relative h-[70vh] w-[35vh] max-w-[280px]",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleSilhouette, {})
      }
    ) }),
    PATIENT_WORDS.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWord, { word: w.text, depth: w.depth, index: i, progress: scrollYProgress }, w.text)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-12 left-1/2 -translate-x-1/2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground", children: "02 — Observation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl md:text-5xl text-gradient", children: "Understanding the patient" })
    ] })
  ] }) });
}
function FloatingWord({
  word,
  depth,
  index,
  progress
}) {
  const angle = index / PATIENT_WORDS.length * Math.PI * 2;
  const radius = 280 + depth * 180;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.55;
  const z = useTransform(progress, [0, 1], [-400 + depth * 800, 400 - depth * 600]);
  const opacity = useTransform(progress, [0.1, 0.4, 0.7, 0.95], [0, 1, 1, 0]);
  const blur = useTransform(z, (v) => `blur(${Math.min(8, Math.abs(v) / 80)}px)`);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      style: {
        x,
        y,
        z,
        opacity,
        filter: blur,
        transformPerspective: 1400
      },
      className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "font-display text-[clamp(1.5rem,3.5vw,3rem)] tracking-tight",
          style: { color: `oklch(${0.7 + depth * 0.25} 0.08 220)` },
          children: word
        }
      )
    }
  );
}
function ParticleSilhouette() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 200 500", className: "h-full w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "silg", cx: "0.5", cy: "0.5", r: "0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#a8e6ff", stopOpacity: "0.9" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#7fd4ff", stopOpacity: "0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("mask", { id: "silmask", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "200", height: "500", fill: "black" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "60", r: "38", fill: "white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86", y: "92", width: "28", height: "22", fill: "white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 130 Q100 110 150 130 L160 280 Q100 300 40 280 Z", fill: "white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M50 130 Q20 180 30 290 L48 290 Q40 200 60 145 Z", fill: "white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M150 130 Q180 180 170 290 L152 290 Q160 200 140 145 Z", fill: "white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M60 280 Q70 380 75 480 L95 480 Q98 380 95 280 Z", fill: "white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M105 280 Q102 380 105 480 L125 480 Q130 380 140 280 Z", fill: "white" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { mask: "url(#silmask)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "200", height: "500", fill: "url(#silg)" }),
      Array.from({ length: 220 }).map((_, i) => {
        const cx = Math.random() * 200;
        const cy = Math.random() * 500;
        const r = Math.random() * 1.2 + 0.3;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.circle,
          {
            cx,
            cy,
            r,
            fill: "#cdeaff",
            initial: { opacity: 0 },
            animate: { opacity: [0.2, 1, 0.2] },
            transition: { duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }
          },
          i
        );
      })
    ] })
  ] });
}
function SectionAnalysis() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line1 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const line2 = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative h-[240vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NeuralNetwork, { progress: scrollYProgress }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-6 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6", children: "03 — Analysis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          style: { opacity: line1, y: useTransform(line1, [0, 1], [30, 0]) },
          className: "font-display text-[clamp(2rem,5vw,4.5rem)] text-gradient",
          children: "Medicine is not guessing."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h2,
        {
          style: { opacity: line2, y: useTransform(line2, [0, 1], [30, 0]) },
          className: "mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] text-aurora italic",
          children: "It is understanding patterns."
        }
      )
    ] })
  ] }) });
}
function NeuralNetwork({ progress }) {
  const nodes = Array.from({ length: 28 }).map((_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 5 + Math.random() * 90
  }));
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 22) edges.push([i, j]);
    }
  }
  const reveal = useTransform(progress, [0.15, 0.7], [0, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.svg,
    {
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      className: "absolute inset-0 h-full w-full",
      style: { opacity: useTransform(progress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0.4]) },
      children: [
        edges.map(([a, b], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.line,
          {
            x1: nodes[a].x,
            y1: nodes[a].y,
            x2: nodes[b].x,
            y2: nodes[b].y,
            stroke: "#7fd4ff",
            strokeWidth: "0.08",
            strokeOpacity: "0.5",
            style: { pathLength: reveal }
          },
          i
        )),
        nodes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.circle,
          {
            cx: n.x,
            cy: n.y,
            r: "0.5",
            fill: "#cdeaff",
            animate: { opacity: [0.4, 1, 0.4], scale: [1, 1.6, 1] },
            transition: { duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }
          },
          n.id
        ))
      ]
    }
  );
}
function SectionReveal() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitScale = useTransform(scrollYProgress, [0, 0.6], [0.6, 1]);
  const portraitOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.4, 0.7], [40, 0]);
  const nameO = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative h-[200vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 flex h-screen items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        style: { scale: portraitScale, opacity: portraitOpacity },
        className: "relative",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(PortraitPlaceholder, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        style: { y: nameY, opacity: nameO },
        className: "absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center w-full px-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.5em] text-primary mb-4", children: "The Doctor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[clamp(3rem,8vw,7rem)] leading-none text-gradient", children: "Dr. Arjun Rao" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base md:text-lg text-muted-foreground", children: "Internal Medicine Specialist · 15+ Years Experience" })
        ]
      }
    )
  ] }) });
}
function PortraitPlaceholder() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[60vh] w-[44vh] max-w-[420px] overflow-hidden rounded-[2rem]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(160deg,oklch(0.25_0.06_220),oklch(0.1_0.02_250))]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 200 280", className: "absolute inset-0 h-full w-full opacity-80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "pp", cx: "0.5", cy: "0.3", r: "0.7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#a8e6ff", stopOpacity: "0.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#0a1220", stopOpacity: "0" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "200", height: "280", fill: "url(#pp)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "100", cy: "100", r: "44", fill: "oklch(0.35 0.04 240)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M40 280 Q100 180 160 280 Z", fill: "oklch(0.3 0.04 240)" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 ring-1 ring-foreground/10 rounded-[2rem]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 bottom-0 p-6 text-xs uppercase tracking-[0.3em] text-foreground/60", children: "Portrait placeholder" })
  ] });
}
const TIMELINE = [
  { year: "2008", title: "M.B.B.S.", place: "AIIMS, New Delhi", icon: GraduationCap },
  { year: "2012", title: "M.D. Internal Medicine", place: "PGIMER, Chandigarh", icon: BookOpen },
  { year: "2014", title: "Senior Residency", place: "Apollo Hospitals", icon: Stethoscope },
  { year: "2017", title: "Fellowship · Diabetology", place: "Joslin Diabetes Center", icon: Award },
  { year: "2020", title: "Published Researcher", place: "12 peer-reviewed papers", icon: BookOpen },
  { year: "2024", title: "Keynote Speaker", place: "World Diabetes Congress", icon: Mic }
];
function SectionJourney() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 40%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative py-32 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground", children: "05 — The Journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-4xl md:text-6xl text-gradient", children: "A path written in patience" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[50%] top-0 h-full w-px -translate-x-1/2 bg-foreground/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          style: { height: lineH },
          className: "absolute left-[50%] top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/60 to-transparent"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-24", children: TIMELINE.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineCard, { ...m, side: i % 2 === 0 ? "left" : "right" }, m.year)) })
    ] })
  ] }) });
}
function TimelineCard({
  year,
  title,
  place,
  icon: Icon,
  side
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: side === "left" ? -60 : 60, rotateY: side === "left" ? -10 : 10 },
      whileInView: { opacity: 1, x: 0, rotateY: 0 },
      viewport: { once: true, margin: "-20%" },
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      className: `relative grid grid-cols-2 gap-8 items-center ${side === "right" ? "" : ""}`,
      style: { transformPerspective: 1200 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: side === "left" ? "text-right pr-12" : "col-start-2 pl-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass inline-block rounded-2xl p-6 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em]", children: year })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: place })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-full bg-primary shadow-[0_0_30px_oklch(0.82_0.12_200_/0.8)]" }) })
      ]
    }
  );
}
const EXPERTISE = [
  { title: "Diabetes Management", icon: Activity, desc: "Personalised glycemic control plans grounded in long-term metabolic balance." },
  { title: "Hypertension", icon: HeartPulse, desc: "Evidence-based blood pressure management with lifestyle co-design." },
  { title: "Thyroid Disorders", icon: Sparkles, desc: "Hormonal recalibration through precise diagnostics and follow-through." },
  { title: "Preventive Healthcare", icon: ShieldCheck, desc: "Early detection systems that read your body before it speaks." },
  { title: "Lifestyle Medicine", icon: Brain, desc: "Nutrition, movement, sleep and stress — treated as medicine, not advice." },
  { title: "General Consultation", icon: Stethoscope, desc: "Patient-first, slow medicine. Time to listen. Time to understand." }
];
function SectionExpertise() {
  const [active, setActive] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-32 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground", children: "06 — Expertise" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-4xl md:text-6xl text-gradient", children: "A universe of care" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "Six orbits of practice. Hover to explore. Each one approached with the same discipline." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: EXPERTISE.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExpertiseCard, { ...e, active: active === i, onHover: () => setActive(i), onLeave: () => setActive(null) }, e.title)) })
  ] }) });
}
function ExpertiseCard({
  title,
  desc,
  icon: Icon,
  active,
  onHover,
  onLeave
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      onMouseEnter: onHover,
      onMouseLeave: onLeave,
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-10%" },
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      whileHover: { y: -6, rotateX: 4, rotateY: -4 },
      style: { transformPerspective: 1200, transformStyle: "preserve-3d" },
      className: "glass relative rounded-3xl p-8 overflow-hidden group cursor-default",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute -inset-12 rounded-full bg-primary/20 blur-3xl",
            animate: { opacity: active ? 0.7 : 0.2, scale: active ? 1.1 : 1 },
            transition: { duration: 0.6 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 ring-1 ring-foreground/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-6 font-display text-2xl text-foreground", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-opacity", children: [
            "Learn more ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
          ] })
        ] })
      ]
    }
  );
}
const METRICS = [
  { value: "10,000+", label: "Patients Treated" },
  { value: "15+", label: "Years of Practice" },
  { value: "98%", label: "Patient Satisfaction" },
  { value: "4.9★", label: "Average Rating" }
];
function SectionImpact() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "relative py-32 px-6 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ImpactParticles, { progress: scrollYProgress }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground", children: "07 — Lives Impacted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display text-4xl md:text-6xl text-gradient", children: [
          "Measured by what cannot",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "be measured."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: METRICS.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
          className: "glass rounded-3xl p-8 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl md:text-5xl text-aurora", children: m.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground", children: m.label })
          ]
        },
        m.label
      )) })
    ] })
  ] });
}
function ImpactParticles({ progress }) {
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { opacity }, className: "absolute inset-0 pointer-events-none", children: Array.from({ length: 40 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "absolute h-1 w-1 rounded-full bg-primary/60",
      style: { left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` },
      animate: {
        y: [0, -30, 0],
        opacity: [0.3, 1, 0.3]
      },
      transition: { duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }
    },
    i
  )) });
}
const STORIES = [
  {
    quote: "I had lived with uncontrolled diabetes for years. Dr. Rao didn't just prescribe — he listened, he traced patterns, he taught me my own body.",
    name: "Meera S.",
    detail: "Patient, 4 years"
  },
  {
    quote: "Calm, curious, and deeply human. The first doctor who asked about my sleep before my symptoms.",
    name: "Rohan K.",
    detail: "Patient, 2 years"
  },
  {
    quote: "He saved my father's life by catching what three specialists missed. Pure pattern recognition.",
    name: "Anika T.",
    detail: "Family of patient"
  }
];
function SectionStories() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-32 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground", children: "08 — Stories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display text-4xl md:text-6xl text-gradient", children: [
        "Memories from those",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "he treated."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-3", children: STORIES.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.figure,
      {
        initial: { opacity: 0, y: 40, rotateZ: i === 1 ? 0 : i === 0 ? -2 : 2 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
        animate: { y: [0, -6, 0] },
        style: {
          animationDelay: `${i * 0.5}s`
        },
        className: "glass rounded-3xl p-8 relative",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-8 font-display text-6xl text-primary/60 leading-none", children: '"' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "font-display text-lg leading-relaxed text-foreground/90", children: s.quote }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-6 border-t border-foreground/10 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.detail })
          ] })
        ]
      },
      i
    )) })
  ] }) });
}
const ACHIEVEMENTS = [
  { title: "Best Internal Medicine Practitioner", year: "2023", body: "Indian Medical Association", kind: "Award" },
  { title: "Patterns in Type-2 Reversal", year: "2022", body: "Journal of Endocrinology", kind: "Publication" },
  { title: "Board Certified — Diabetology", year: "2017", body: "American Board of Endocrinology", kind: "Certification" },
  { title: "Lifestyle Medicine in Urban India", year: "2024", body: "TEDxBangalore · Keynote", kind: "Talk" },
  { title: "Continuous Glucose Cohort Study", year: "2021", body: "ICMR funded · 800 participants", kind: "Research" },
  { title: "Fellowship — Harvard Medical School", year: "2019", body: "Visiting Scholar", kind: "Honor" }
];
function SectionResearch() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-32 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground", children: "09 — Research & Recognition" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-4xl md:text-6xl text-gradient", children: "The work behind the work." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: ACHIEVEMENTS.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.article,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
        whileHover: { y: -4, rotateX: 3, rotateY: -3 },
        style: { transformPerspective: 1e3 },
        className: "glass rounded-2xl p-6 group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs uppercase tracking-[0.3em] text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.kind }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: a.year })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl text-foreground leading-snug", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: a.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })
        ]
      },
      a.title
    )) })
  ] }) });
}
function SectionPhilosophy() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const l1 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const l2 = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "relative h-[160vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 flex h-screen items-center justify-center px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground mb-12", children: "10 — Philosophy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.h2,
      {
        style: { opacity: l1, y: useTransform(l1, [0, 1], [40, 0]) },
        className: "font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] text-gradient",
        children: "Treating people."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.h2,
      {
        style: { opacity: l2, y: useTransform(l2, [0, 1], [40, 0]) },
        className: "mt-6 font-display italic text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] text-aurora",
        children: "Not just symptoms."
      }
    )
  ] }) }) });
}
function SectionConsultation() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-32 px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-muted-foreground", children: "11 — Consultation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-4xl md:text-6xl text-gradient", children: "Begin your conversation." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground max-w-xl mx-auto", children: "A consultation with Dr. Rao is unhurried, attentive and built around your story." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 md:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-3 glass rounded-3xl p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "grid gap-5", onSubmit: (e) => e.preventDefault(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", type: "text", placeholder: "Your name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", type: "email", placeholder: "you@example.com" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", type: "tel", placeholder: "+91 ..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preferred date", type: "date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Preferred time", type: "time" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Reason for visit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                rows: 4,
                className: "rounded-xl bg-foreground/5 border border-foreground/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/60",
                placeholder: "Briefly tell us what's on your mind."
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90",
              children: [
                "Request Appointment ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 16 })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "md:col-span-2 grid gap-4 content-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { icon: MapPin, title: "Clinic", lines: ["Lifecare Medical Centre", "Indiranagar, Bengaluru 560038"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { icon: Clock, title: "Hours", lines: ["Mon — Sat · 10:00 — 19:00", "Sun · By appointment"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { icon: Phone, title: "Contact", lines: ["+91 80 4000 0000", "consult@drarjunrao.com"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: "Consultation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-display text-3xl text-aurora", children: "₹1,200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "First consultation · 45 minutes" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mx-auto max-w-6xl mt-32 pt-10 border-t border-foreground/5 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Dr. Arjun Rao. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase tracking-[0.3em]", children: "Inside the Doctor's Mind" })
    ] })
  ] });
}
function Field({ label, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ...rest,
        className: "rounded-xl bg-foreground/5 border border-foreground/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/60"
      }
    )
  ] });
}
function InfoCard({ icon: Icon, title, lines }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 ring-1 ring-foreground/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-muted-foreground", children: title }),
      lines.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground mt-1", children: l }, l))
    ] })
  ] });
}
function TopNav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 left-0 right-0 z-50 px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full glass grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm text-primary", children: "AR" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.3em] text-foreground/80 hidden md:inline", children: "Inside the Doctor's Mind" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#consult",
          onClick: (e) => {
            e.preventDefault();
            document.querySelector("#consult")?.scrollIntoView({ behavior: "smooth" });
          },
          className: "text-xs uppercase tracking-[0.3em] glass rounded-full px-5 py-2.5 hover:text-primary transition",
          children: "Consult"
        }
      )
    ] })
  ] }) });
}
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      style: { scaleX: x, transformOrigin: "0% 50%" },
      className: "fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent"
    }
  );
}
function MouseLight() {
  const ref = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      onMouseMove: (e) => {
        if (!ref.current) return;
        ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      },
      className: "fixed inset-0 z-0 pointer-events-auto",
      style: { pointerEvents: "none" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref,
          className: "absolute h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl transition-transform duration-500 ease-out"
        }
      )
    }
  );
}
function Loader({ done }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 1 },
      animate: { opacity: done ? 0 : 1 },
      transition: { duration: 0.8, ease: "easeInOut" },
      style: { pointerEvents: done ? "none" : "auto" },
      className: "fixed inset-0 z-[100] grid place-items-center bg-background",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { rotate: 360 },
            transition: { duration: 6, repeat: Infinity, ease: "linear" },
            className: "mx-auto h-20 w-20 rounded-full border border-primary/40 border-t-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-display text-aurora text-lg tracking-wide", children: "Inside the Doctor's Mind" })
      ] })
    }
  );
}
function Index() {
  useThemeInit();
  const [loaded, setLoaded] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-background text-foreground noise", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { done: loaded }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ClientOnly, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SmoothScroll, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BackgroundScene, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MouseLight, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionQuestion, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionPatient, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionAnalysis, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionReveal, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionJourney, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionExpertise, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionImpact, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionStories, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionResearch, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionPhilosophy, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "consult", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionConsultation, {}) })
    ] })
  ] });
}
export {
  Index as component
};
