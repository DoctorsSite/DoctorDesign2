import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef, useState, lazy, Suspense } from "react";
import { ThemeToggle } from "./ThemeToggle";
import {
  Activity,
  Brain,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  Award,
  BookOpen,
  Mic,
  GraduationCap,
  ArrowUpRight,
  MapPin,
  Clock,
  Phone,
} from "lucide-react";

const MindScene = lazy(() =>
  import("../three/MindScene").then((m) => ({ default: m.MindScene })),
);

const AnalysisScene = lazy(() =>
  import("../three/AnalysisScene").then((m) => ({ default: m.AnalysisScene })),
);

/* ----------------------------- Section 1 ------------------------------ */
export function SectionQuestion() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const z = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0]);
  const lineW = useTransform(scrollYProgress, [0, 0.5], ["30%", "100%"]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Two-column layout: text left, 3D right — mirrors DC1 hero grid */}
        <div className="relative h-full flex items-center px-6 lg:px-12 max-w-7xl mx-auto gap-6">
          {/* Left: headline text with scroll-parallax */}
          <motion.div
            style={{ scale, opacity, z, transformPerspective: 1200 }}
            className="flex-1 lg:flex-none lg:w-[52%]"
          >
            <p className="font-display text-[clamp(2rem,5.5vw,7rem)] leading-[0.95] text-aurora">
              Every diagnosis<br />begins with a question.
            </p>
          </motion.div>

          {/* Right: 3D crystal mind — hidden on small screens */}
          <motion.div
            style={{ opacity: sceneOpacity }}
            className="hidden lg:block flex-1 h-full"
          >
            <Suspense fallback={null}>
              <MindScene />
            </Suspense>
          </motion.div>
        </div>

        <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[min(80vw,720px)]">
          <motion.div style={{ width: lineW }} className="relative h-px overflow-visible">
            <Heartbeat />
          </motion.div>
        </div>
        <ScrollHint />
      </div>
    </section>
  );
}

function Heartbeat() {
  return (
    <svg viewBox="0 0 600 60" className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="hb" x1="0" x2="1">
          <stop offset="0" stopColor="#7fd4ff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#7fd4ff" />
          <stop offset="1" stopColor="#7fd4ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 30 L120 30 L150 30 L165 10 L185 50 L205 20 L225 40 L245 30 L600 30"
        stroke="url(#hb)"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
      />
    </svg>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
    >
      <span>Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="h-8 w-px bg-gradient-to-b from-foreground/40 to-transparent"
      />
    </motion.div>
  );
}

/* ----------------------------- Section 2 ------------------------------ */
const PATIENT_WORDS = [
  { text: "Symptoms", depth: 0.2 },
  { text: "Lifestyle", depth: 0.6 },
  { text: "History", depth: 0.4 },
  { text: "Nutrition", depth: 0.8 },
  { text: "Stress", depth: 0.3 },
  { text: "Sleep", depth: 0.7 },
  { text: "Patterns", depth: 0.5 },
  { text: "Family", depth: 0.9 },
  { text: "Habits", depth: 0.25 },
];

export function SectionPatient() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const silhouette = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ opacity: silhouette, scale: useTransform(silhouette, [0, 1], [0.8, 1]) }}
            className="relative h-[70vh] w-[35vh] max-w-[280px]"
          >
            <ParticleSilhouette />
          </motion.div>
        </div>
        {PATIENT_WORDS.map((w, i) => (
          <FloatingWord key={w.text} word={w.text} depth={w.depth} index={i} progress={scrollYProgress} />
        ))}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">02 — Observation</p>
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-gradient">Understanding the patient</h2>
        </div>
      </div>
    </section>
  );
}

function FloatingWord({
  word,
  depth,
  index,
  progress,
}: {
  word: string;
  depth: number;
  index: number;
  progress: MotionValue<number>;
}) {
  const angle = (index / PATIENT_WORDS.length) * Math.PI * 2;
  const radius = 280 + depth * 180;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.55;
  const z = useTransform(progress, [0, 1], [-400 + depth * 800, 400 - depth * 600]);
  const opacity = useTransform(progress, [0.1, 0.4, 0.7, 0.95], [0, 1, 1, 0]);
  const blur = useTransform(z, (v) => `blur(${Math.min(8, Math.abs(v) / 80)}px)`);
  return (
    <motion.div
      style={{
        x,
        y,
        z,
        opacity,
        filter: blur,
        transformPerspective: 1400,
      }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <span
        className="font-display text-[clamp(1.5rem,3.5vw,3rem)] tracking-tight"
        style={{ color: `oklch(${0.7 + depth * 0.25} 0.08 220)` }}
      >
        {word}
      </span>
    </motion.div>
  );
}

function ParticleSilhouette() {
  // SVG human silhouette filled with dots.
  return (
    <svg viewBox="0 0 200 500" className="h-full w-full">
      <defs>
        <radialGradient id="silg" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#a8e6ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7fd4ff" stopOpacity="0" />
        </radialGradient>
        <mask id="silmask">
          <rect width="200" height="500" fill="black" />
          {/* head */}
          <circle cx="100" cy="60" r="38" fill="white" />
          {/* neck */}
          <rect x="86" y="92" width="28" height="22" fill="white" />
          {/* torso */}
          <path d="M50 130 Q100 110 150 130 L160 280 Q100 300 40 280 Z" fill="white" />
          {/* arms */}
          <path d="M50 130 Q20 180 30 290 L48 290 Q40 200 60 145 Z" fill="white" />
          <path d="M150 130 Q180 180 170 290 L152 290 Q160 200 140 145 Z" fill="white" />
          {/* legs */}
          <path d="M60 280 Q70 380 75 480 L95 480 Q98 380 95 280 Z" fill="white" />
          <path d="M105 280 Q102 380 105 480 L125 480 Q130 380 140 280 Z" fill="white" />
        </mask>
      </defs>
      <g mask="url(#silmask)">
        <rect width="200" height="500" fill="url(#silg)" />
        {Array.from({ length: 220 }).map((_, i) => {
          const cx = Math.random() * 200;
          const cy = Math.random() * 500;
          const r = Math.random() * 1.2 + 0.3;
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="#cdeaff"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* ----------------------------- Section 3 ------------------------------ */
export function SectionAnalysis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const line1 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const line2 = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const canvasOpacity = useTransform(scrollYProgress, [0.1, 0.28, 0.78, 1], [0, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* 3D diamond — sits behind all text via z-0 */}
        <motion.div
          style={{ opacity: canvasOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Suspense fallback={null}>
            <AnalysisScene />
          </Suspense>
        </motion.div>

        {/* Text panel — z-10 ensures it is always in front of the canvas.
            The frosted backdrop makes both lines readable over bright 3D edges. */}
        <div className="relative z-10 text-center px-10 py-8 max-w-3xl rounded-3xl bg-background/45 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">03 — Analysis</p>
          <motion.h2
            style={{ opacity: line1, y: useTransform(line1, [0, 1], [30, 0]) }}
            className="font-display text-[clamp(2rem,5vw,4.5rem)] text-gradient"
          >
            Medicine is not guessing.
          </motion.h2>
          <motion.h2
            style={{ opacity: line2, y: useTransform(line2, [0, 1], [30, 0]) }}
            className="mt-6 font-display text-[clamp(2rem,5vw,4.5rem)] text-aurora italic"
          >
            It is understanding patterns.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Section 4 ------------------------------ */
export function SectionReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const portraitScale = useTransform(scrollYProgress, [0, 0.6], [0.6, 1]);
  const portraitOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.4, 0.7], [40, 0]);
  const nameO = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: portraitScale, opacity: portraitOpacity }}
          className="relative"
        >
          <PortraitPlaceholder />
        </motion.div>
        <motion.div
          style={{ y: nameY, opacity: nameO }}
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center w-full px-6"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-primary mb-4">The Doctor</p>
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none text-gradient">
            Dr. Arjun Rao
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Internal Medicine Specialist · 15+ Years Experience
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="relative h-[60vh] w-[44vh] max-w-[420px] overflow-hidden rounded-[2rem]">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,oklch(0.25_0.06_220),oklch(0.1_0.02_250))]" />
      <svg viewBox="0 0 200 280" className="absolute inset-0 h-full w-full opacity-80">
        <defs>
          <radialGradient id="pp" cx="0.5" cy="0.3" r="0.7">
            <stop offset="0" stopColor="#a8e6ff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#0a1220" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="280" fill="url(#pp)" />
        <circle cx="100" cy="100" r="44" fill="oklch(0.35 0.04 240)" />
        <path d="M40 280 Q100 180 160 280 Z" fill="oklch(0.3 0.04 240)" />
      </svg>
      <div className="absolute inset-0 ring-1 ring-foreground/10 rounded-[2rem]" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-xs uppercase tracking-[0.3em] text-foreground/60">
        Portrait placeholder
      </div>
    </div>
  );
}

/* ----------------------------- Section 5 ------------------------------ */
const TIMELINE = [
  { year: "2008", title: "M.B.B.S.", place: "AIIMS, New Delhi", icon: GraduationCap },
  { year: "2012", title: "M.D. Internal Medicine", place: "PGIMER, Chandigarh", icon: BookOpen },
  { year: "2014", title: "Senior Residency", place: "Apollo Hospitals", icon: Stethoscope },
  { year: "2017", title: "Fellowship · Diabetology", place: "Joslin Diabetes Center", icon: Award },
  { year: "2020", title: "Published Researcher", place: "12 peer-reviewed papers", icon: BookOpen },
  { year: "2024", title: "Keynote Speaker", place: "World Diabetes Congress", icon: Mic },
];

export function SectionJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 40%"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">05 — The Journey</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-gradient">A path written in patience</h2>
        </div>
        <div className="relative">
          <div className="absolute left-[50%] top-0 h-full w-px -translate-x-1/2 bg-foreground/5" />
          <motion.div
            style={{ height: lineH }}
            className="absolute left-[50%] top-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-primary/60 to-transparent"
          />
          <div className="space-y-24">
            {TIMELINE.map((m, i) => (
              <TimelineCard key={m.year} {...m} side={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  year,
  title,
  place,
  icon: Icon,
  side,
}: {
  year: string;
  title: string;
  place: string;
  icon: typeof Award;
  side: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -60 : 60, rotateY: side === "left" ? -10 : 10 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid grid-cols-2 gap-8 items-center ${side === "right" ? "" : ""}`}
      style={{ transformPerspective: 1200 }}
    >
      <div className={side === "left" ? "text-right pr-12" : "col-start-2 pl-12"}>
        <div className="glass inline-block rounded-2xl p-6 text-left">
          <div className="flex items-center gap-3 text-primary">
            <Icon size={18} />
            <span className="text-xs uppercase tracking-[0.3em]">{year}</span>
          </div>
          <h3 className="mt-3 font-display text-2xl text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{place}</p>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-3 w-3 rounded-full bg-primary shadow-[0_0_30px_oklch(0.82_0.12_200_/0.8)]" />
      </div>
    </motion.div>
  );
}

/* ----------------------------- Section 6 ------------------------------ */
const EXPERTISE = [
  { title: "Diabetes Management", icon: Activity, desc: "Personalised glycemic control plans grounded in long-term metabolic balance." },
  { title: "Hypertension", icon: HeartPulse, desc: "Evidence-based blood pressure management with lifestyle co-design." },
  { title: "Thyroid Disorders", icon: Sparkles, desc: "Hormonal recalibration through precise diagnostics and follow-through." },
  { title: "Preventive Healthcare", icon: ShieldCheck, desc: "Early detection systems that read your body before it speaks." },
  { title: "Lifestyle Medicine", icon: Brain, desc: "Nutrition, movement, sleep and stress — treated as medicine, not advice." },
  { title: "General Consultation", icon: Stethoscope, desc: "Patient-first, slow medicine. Time to listen. Time to understand." },
];

export function SectionExpertise() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">06 — Expertise</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-gradient">A universe of care</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Six orbits of practice. Hover to explore. Each one approached with the same discipline.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((e, i) => (
            <ExpertiseCard key={e.title} {...e} active={active === i} onHover={() => setActive(i)} onLeave={() => setActive(null)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({
  title,
  desc,
  icon: Icon,
  active,
  onHover,
  onLeave,
}: {
  title: string;
  desc: string;
  icon: typeof Activity;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
      style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className="glass relative rounded-3xl p-8 overflow-hidden group cursor-default"
    >
      <motion.div
        className="absolute -inset-12 rounded-full bg-primary/20 blur-3xl"
        animate={{ opacity: active ? 0.7 : 0.2, scale: active ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
      />
      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 ring-1 ring-foreground/10 text-primary">
          <Icon size={24} />
        </div>
        <h3 className="mt-6 font-display text-2xl text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <ArrowUpRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------- Section 7 ------------------------------ */
const METRICS = [
  { value: "10,000+", label: "Patients Treated" },
  { value: "15+", label: "Years of Practice" },
  { value: "98%", label: "Patient Satisfaction" },
  { value: "4.9★", label: "Average Rating" },
];

export function SectionImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <ImpactParticles progress={scrollYProgress} />
      <div className="mx-auto max-w-6xl relative">
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">07 — Lives Impacted</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-gradient">Measured by what cannot<br/>be measured.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-3xl p-8 text-center"
            >
              <div className="font-display text-4xl md:text-5xl text-aurora">{m.value}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactParticles({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/60"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}
    </motion.div>
  );
}

/* ----------------------------- Section 8 ------------------------------ */
const STORIES = [
  {
    quote: "I had lived with uncontrolled diabetes for years. Dr. Rao didn't just prescribe — he listened, he traced patterns, he taught me my own body.",
    name: "Meera S.",
    detail: "Patient, 4 years",
  },
  {
    quote: "Calm, curious, and deeply human. The first doctor who asked about my sleep before my symptoms.",
    name: "Rohan K.",
    detail: "Patient, 2 years",
  },
  {
    quote: "He saved my father's life by catching what three specialists missed. Pure pattern recognition.",
    name: "Anika T.",
    detail: "Family of patient",
  },
];

export function SectionStories() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">08 — Stories</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-gradient">Memories from those<br/>he treated.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40, rotateZ: i === 1 ? 0 : (i === 0 ? -2 : 2) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              animate={{ y: [0, -6, 0] }}
              style={{
                animationDelay: `${i * 0.5}s`,
              }}
              className="glass rounded-3xl p-8 relative"
            >
              <div className="absolute -top-3 left-8 font-display text-6xl text-primary/60 leading-none">"</div>
              <blockquote className="font-display text-lg leading-relaxed text-foreground/90">
                {s.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-foreground/10 pt-4">
                <div className="text-sm text-foreground">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.detail}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Section 9 ------------------------------ */
const ACHIEVEMENTS = [
  { title: "Best Internal Medicine Practitioner", year: "2023", body: "Indian Medical Association", kind: "Award" },
  { title: "Patterns in Type-2 Reversal", year: "2022", body: "Journal of Endocrinology", kind: "Publication" },
  { title: "Board Certified — Diabetology", year: "2017", body: "American Board of Endocrinology", kind: "Certification" },
  { title: "Lifestyle Medicine in Urban India", year: "2024", body: "TEDxBangalore · Keynote", kind: "Talk" },
  { title: "Continuous Glucose Cohort Study", year: "2021", body: "ICMR funded · 800 participants", kind: "Research" },
  { title: "Fellowship — Harvard Medical School", year: "2019", body: "Visiting Scholar", kind: "Honor" },
];

export function SectionResearch() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">09 — Research & Recognition</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-gradient">The work behind the work.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, rotateX: 3, rotateY: -3 }}
              style={{ transformPerspective: 1000 }}
              className="glass rounded-2xl p-6 group"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-primary">
                <span>{a.kind}</span>
                <span className="text-muted-foreground">{a.year}</span>
              </div>
              <h3 className="mt-4 font-display text-xl text-foreground leading-snug">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Section 10 ----------------------------- */
export function SectionPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const l1 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const l2 = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  return (
    <section ref={ref} className="relative h-[160vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <div className="text-center max-w-5xl">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-12">10 — Philosophy</p>
          <motion.h2
            style={{ opacity: l1, y: useTransform(l1, [0, 1], [40, 0]) }}
            className="font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] text-gradient"
          >
            Treating people.
          </motion.h2>
          <motion.h2
            style={{ opacity: l2, y: useTransform(l2, [0, 1], [40, 0]) }}
            className="mt-6 font-display italic text-[clamp(2.5rem,8vw,8rem)] leading-[0.95] text-aurora"
          >
            Not just symptoms.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Section 11 ----------------------------- */
export function SectionConsultation() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">11 — Consultation</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-gradient">Begin your conversation.</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            A consultation with Dr. Rao is unhurried, attentive and built around your story.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3 glass rounded-3xl p-8">
            <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
              <Field label="Full name" type="text" placeholder="Your name" />
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Email" type="email" placeholder="you@example.com" />
                <Field label="Phone" type="tel" placeholder="+91 ..." />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Preferred date" type="date" />
                <Field label="Preferred time" type="time" />
              </div>
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reason for visit</span>
                <textarea
                  rows={4}
                  className="rounded-xl bg-foreground/5 border border-foreground/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/60"
                  placeholder="Briefly tell us what's on your mind."
                />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Request Appointment <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
          <aside className="md:col-span-2 grid gap-4 content-start">
            <InfoCard icon={MapPin} title="Clinic" lines={["Lifecare Medical Centre", "Indiranagar, Bengaluru 560038"]} />
            <InfoCard icon={Clock} title="Hours" lines={["Mon — Sat · 10:00 — 19:00", "Sun · By appointment"]} />
            <InfoCard icon={Phone} title="Contact" lines={["+91 80 4000 0000", "consult@drarjunrao.com"]} />
            <div className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Consultation</div>
              <div className="mt-2 font-display text-3xl text-aurora">₹1,200</div>
              <div className="text-xs text-muted-foreground">First consultation · 45 minutes</div>
            </div>
          </aside>
        </div>
      </div>
      <footer className="mx-auto max-w-6xl mt-32 pt-10 border-t border-foreground/5 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Dr. Arjun Rao. All rights reserved.</span>
        <span className="uppercase tracking-[0.3em]">Inside the Doctor's Mind</span>
      </footer>
    </section>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="rounded-xl bg-foreground/5 border border-foreground/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/60"
      />
    </label>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: typeof MapPin; title: string; lines: string[] }) {
  return (
    <div className="glass rounded-2xl p-6 flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/5 ring-1 ring-foreground/10 text-primary">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{title}</div>
        {lines.map((l) => (
          <div key={l} className="text-sm text-foreground mt-1">{l}</div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Nav & Progress ------------------------- */
export function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full glass grid place-items-center">
            <span className="font-display text-sm text-primary">AR</span>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/80 hidden md:inline">
            Inside the Doctor's Mind
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#consult"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#consult")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs uppercase tracking-[0.3em] glass rounded-full px-5 py-2.5 hover:text-primary transition"
          >
            Consult
          </a>
        </div>
      </div>
    </header>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: x, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gradient-to-r from-primary via-primary/60 to-transparent"
    />
  );
}

export function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      onMouseMove={(e) => {
        if (!ref.current) return;
        ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }}
      className="fixed inset-0 z-0 pointer-events-auto"
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={ref}
        className="absolute h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl transition-transform duration-500 ease-out"
      />
    </div>
  );
}

export function Loader({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ pointerEvents: done ? "none" : "auto" }}
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="mx-auto h-20 w-20 rounded-full border border-primary/40 border-t-primary"
        />
        <p className="mt-6 font-display text-aurora text-lg tracking-wide">Inside the Doctor's Mind</p>
      </div>
    </motion.div>
  );
}