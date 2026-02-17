import { useState, useEffect, useRef } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  featured?: boolean;
}

interface Skill {
  icon: string;
  name: string;
  desc: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Project Name",
    description:
      "A brief description of what the app does, the problem it solves, and what makes it interesting technically.",
    tags: ["React", "PHP", "MySQL", "REST API"],
    emoji: "🚀",
    featured: true,
  },
  {
    id: "02",
    title: "Project Name",
    description:
      "Short description of what this project does and the technology choices involved.",
    tags: ["React", "Tailwind"],
    emoji: "⚡",
  },
  {
    id: "03",
    title: "Project Name",
    description:
      "Short description of what this project does and the technology choices involved.",
    tags: ["PHP", "MySQL", "JavaScript"],
    emoji: "🛠️",
  },
];

const SKILLS: Skill[] = [
  { icon: "⚛️", name: "React", desc: "Components, hooks, state management, and modern patterns." },
  { icon: "🐘", name: "PHP", desc: "REST APIs, auth, database logic, server-side rendering." },
  { icon: "🎨", name: "UI / UX", desc: "Pixel-perfect layouts, responsive design, interaction details." },
  { icon: "🗄️", name: "Database", desc: "MySQL, schema design, queries, and API integration." },
];

const STACK = ["React", "PHP", "JavaScript", "Tailwind", "MySQL", "REST API", "Git"];

export default function PortfolioLanding() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const trailRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  // Mount animation trigger
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Custom cursor
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      trailRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    const animate = () => {
      setTrailPos((prev) => ({
        x: prev.x + (trailRef.current.x - prev.x) * 0.12,
        y: prev.y + (trailRef.current.y - prev.y) * 0.12,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Intersection observer for scroll reveals
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [mounted]);

  const smooth = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

        .font-syne   { font-family: 'Syne', sans-serif; }
        .font-mono-dm { font-family: 'DM Mono', monospace; }

        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes blobOne  { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(60px,50px) scale(1.08); } }
        @keyframes blobTwo  { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-50px,-35px) scale(1.12); } }
        @keyframes shimmer  { from { background-position: 200% center; } to { background-position: -200% center; } }
        @keyframes scanline { to { left: 110%; } }
        @keyframes pulse-dot { 0%,100% { box-shadow:0 0 0 0 rgba(34,197,94,.45); } 50% { box-shadow:0 0 0 5px rgba(34,197,94,0); } }

        .anim-fade-up-1 { animation: fadeUp .65s .15s both; }
        .anim-fade-up-2 { animation: fadeUp .65s .32s both; }
        .anim-fade-up-3 { animation: fadeUp .65s .48s both; }
        .anim-fade-up-4 { animation: fadeUp .65s .62s both; }
        .anim-fade-in   { animation: fadeIn .8s 1s both; }
        .anim-blob-1    { animation: blobOne  13s ease-in-out infinite; }
        .anim-blob-2    { animation: blobTwo  16s ease-in-out infinite; }
        .anim-shimmer   { animation: shimmer 3s linear infinite; background-size: 200% 100%; }
        .anim-pulse-dot { animation: pulse-dot 2s infinite; }

        .scanline-bar::after {
          content:'';
          position:absolute; top:0; left:-110%; width:100%; height:100%;
          background: #00e5ff;
          animation: scanline 2.2s 1.6s infinite;
        }

        [data-reveal] {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity .6s ease, transform .6s ease;
        }

        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.13);
        }
        .outline-accent {
          color: transparent;
          -webkit-text-stroke: 1.5px #00e5ff;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0,229,255,.024) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,.024) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .skill-card-hover:hover::before {
          opacity: 1 !important;
        }
      `}</style>

      <div
        className="fixed z-[9999] pointer-events-none rounded-full bg-cyan-400 mix-blend-difference transition-transform duration-75"
        style={{
          width: 10,
          height: 10,
          left: cursorPos.x - 5,
          top: cursorPos.y - 5,
          transform: hovering ? "scale(2.6)" : "scale(1)",
        }}
      />
      <div
        className="fixed z-[9998] pointer-events-none rounded-full border border-cyan-400/30"
        style={{
          width: 32,
          height: 32,
          left: trailPos.x - 16,
          top: trailPos.y - 16,
          transform: hovering ? "scale(0.5)" : "scale(1)",
          opacity: hovering ? 0.5 : 1,
          transition: "transform .2s, opacity .2s",
        }}
      />

      <div
        className="relative font-mono-dm bg-[#080b10] text-[#e8edf5] min-h-screen overflow-x-hidden"
        style={{ cursor: "none" }}
      >
        <div className="grid-bg fixed inset-0 z-0 pointer-events-none" />

        <div
          className="fixed inset-0 z-[2] pointer-events-none opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <div
          className="anim-blob-1 fixed -top-48 -left-48 w-[580px] h-[580px] rounded-full pointer-events-none z-0 opacity-[0.16]"
          style={{ background: "radial-gradient(circle, #00e5ff, transparent 70%)", filter: "blur(110px)" }}
        />
        <div
          className="anim-blob-2 fixed -bottom-36 -right-24 w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-[0.14]"
          style={{ background: "radial-gradient(circle, #ff6b35, transparent 70%)", filter: "blur(110px)" }}
        />

        <div
          className="anim-shimmer fixed top-0 left-0 right-0 h-[2px] z-[200]"
          style={{ background: "linear-gradient(90deg, #00e5ff, #ff6b35, #00e5ff)" }}
        />

        <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 sm:px-16 py-6"
          style={{ background: "linear-gradient(to bottom, rgba(8,11,16,.92), transparent)" }}>
          <a
            href="#"
            className="font-syne font-extrabold text-xl tracking-tight text-[#e8edf5] no-underline"
            onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
          >
            Islem<span className="text-cyan-400">.</span>
          </a>

          <ul className="hidden sm:flex gap-10 list-none">
            {["about", "projects", "contact"].map((s) => (
              <li key={s}>
                <button
                  onClick={() => smooth(s)}
                  className="font-mono-dm text-[11px] uppercase tracking-widest text-[#5a6478] hover:text-cyan-400 transition-colors bg-transparent border-none cursor-none"
                  onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-[11px] text-[#5a6478] tracking-wider border border-white/[0.07] px-3.5 py-1.5 rounded-full">
            <span className="anim-pulse-dot w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Open for opportunities
          </div>
        </nav>

        <div className="anim-fade-in fixed right-10 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-4">
          {[
            {
              label: "GitHub",
              href: "#",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              ),
            },
            {
              label: "LinkedIn",
              href: "#",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              ),
            },
            {
              label: "CV",
              href: "#",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
                </svg>
              ),
            },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              title={label}
              className="w-9 h-9 border border-white/[0.07] rounded bg-white/[0.03] flex items-center justify-center text-[#5a6478] hover:border-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-400/5 hover:-translate-x-1 transition-all"
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
            >
              {icon}
            </a>
          ))}
        </div>


        <section className="relative z-[1] min-h-screen flex flex-col justify-center px-10 sm:px-16 max-w-[1400px] mx-auto">

          {/* Eyebrow */}
          <div className="anim-fade-up-1 flex items-center gap-3 text-[11px] text-cyan-400 uppercase tracking-[0.16em] mb-8">
            <span className="w-8 h-px bg-cyan-400 block" />
            Full Stack Developer — Algeria
          </div>

          {/* Headline */}
          <h1 className="anim-fade-up-2 font-syne font-extrabold leading-[0.92] tracking-[-0.03em] mb-10"
            style={{ fontSize: "clamp(52px,8.5vw,112px)" }}>
            <span className="block">Crafting</span>
            <span className="block">
              <span className="outline-accent">Fast,</span>{" "}
              <span className="text-[#e8edf5]">Clean</span>
            </span>
            <span className="block">
              Web Apps<span className="text-[#ff6b35] italic">.</span>
            </span>
          </h1>

          {/* Sub row */}
          <div className="anim-fade-up-3 flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
            <p className="max-w-[400px] text-sm leading-[1.85] text-[#5a6478] font-light">
              I'm{" "}
              <strong className="text-[#e8edf5] font-normal">Islem</strong> — a
              full-stack dev with a{" "}
              <strong className="text-[#e8edf5] font-normal">
                frontend-first mindset
              </strong>
              . I build with{" "}
              <strong className="text-[#e8edf5] font-normal">React</strong> on
              the front,{" "}
              <strong className="text-[#e8edf5] font-normal">PHP</strong> on the
              back, and ship products that feel as good as they perform.
              Currently studying, always building.
            </p>

            <div className="hidden lg:block w-px self-stretch bg-white/[0.07]" />

            <div>
              <p className="text-[10px] text-[#5a6478] uppercase tracking-[0.14em] mb-3">
                // stack
              </p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((t) => (
                  <span
                    key={t}
                    className={`text-[11px] px-3 py-1 rounded border tracking-[0.04em] transition-all ${
                      ["React", "PHP"].includes(t)
                        ? "border-cyan-400/30 text-cyan-400 bg-cyan-400/5"
                        : "border-white/[0.07] text-[#5a6478] bg-white/[0.03] hover:border-cyan-400/30 hover:text-cyan-400"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="anim-fade-up-4 flex flex-wrap items-center gap-5 mt-14">
            <button
              onClick={() => smooth("projects")}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-400 text-[#080b10] text-[13px] tracking-[0.05em] rounded font-mono-dm hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,229,255,0.28)] transition-all cursor-none"
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
            >
              View Projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => smooth("contact")}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-[#e8edf5] text-[13px] tracking-[0.05em] rounded border border-white/[0.07] font-mono-dm hover:border-white/30 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all cursor-none"
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
            >
              Get in touch
            </button>

            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[12px] text-[#5a6478] tracking-[0.05em] no-underline hover:text-[#e8edf5] transition-colors cursor-none"
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M3 17v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
              </svg>
              Download CV
            </a>
          </div>

          <div className="anim-fade-in absolute bottom-10 left-10 sm:left-16 flex items-center gap-3 text-[10px] text-[#5a6478] uppercase tracking-[0.14em]">
            <div className="scanline-bar relative w-10 h-px bg-[#5a6478] overflow-hidden" />
            Scroll to explore
          </div>

          <div className="anim-fade-in absolute bottom-10 right-20 hidden md:flex gap-10">
            {[
              { val: "10+", label: "Projects" },
              { val: "2+", label: "Years Coding" },
              { val: "∞", label: "Curiosity" },
            ].map(({ val, label }) => (
              <div key={label} className="text-right">
                <span className="font-syne font-extrabold text-[28px] text-[#e8edf5] leading-none block">
                  {val.includes("+") ? (
                    <>
                      {val.replace("+", "")}
                      <span className="text-cyan-400">+</span>
                    </>
                  ) : (
                    <span className="text-cyan-400">{val}</span>
                  )}
                </span>
                <span className="text-[10px] text-[#5a6478] uppercase tracking-[0.1em] mt-1 block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>


        <section id="about" className="relative z-[1] px-10 sm:px-16 py-32 max-w-[1400px] mx-auto">
          <SectionLabel text="About" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Text */}
            <div data-reveal>
              <h2 className="font-syne font-bold leading-[1.08] tracking-[-0.025em] mb-7"
                style={{ fontSize: "clamp(30px,4vw,52px)" }}>
                Building while{" "}
                <em className="text-cyan-400 not-italic font-normal">still learning.</em>
              </h2>
              <p className="text-sm leading-[1.9] text-[#5a6478] font-light mb-5">
                I'm a{" "}
                <strong className="text-[#e8edf5] font-normal">
                  full-stack developer
                </strong>{" "}
                currently studying, with a strong lean toward frontend. I care
                about the details — the way a component transitions, how a layout
                breathes, whether the API feels fast enough.
              </p>
              <p className="text-sm leading-[1.9] text-[#5a6478] font-light">
                My stack revolves around{" "}
                <strong className="text-[#e8edf5] font-normal">React</strong> for
                building interfaces and{" "}
                <strong className="text-[#e8edf5] font-normal">PHP</strong> for
                the backend. I'm the kind of dev who reads the docs, ships clean
                code, and actually cares about the user experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4" data-reveal>
              {SKILLS.map((s) => (
                <div
                  key={s.name}
                  className="group relative border border-white/[0.07] rounded-lg p-5 bg-white/[0.03] hover:border-cyan-400/20 hover:-translate-y-0.5 transition-all overflow-hidden"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xl mb-2.5">{s.icon}</div>
                  <div className="font-syne text-sm font-semibold mb-1.5">{s.name}</div>
                  <div className="text-[11px] text-[#5a6478] leading-[1.6]">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="projects" className="relative z-[1] px-10 sm:px-16 py-32 max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <SectionLabel text="Projects" />
              <h2 className="font-syne font-extrabold leading-[0.95] tracking-[-0.03em]"
                style={{ fontSize: "clamp(32px,4.5vw,58px)" }}>
                Selected<br />Work
              </h2>
            </div>
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#5a6478] uppercase tracking-[0.08em] no-underline hover:text-[#e8edf5] transition-colors cursor-none"
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
            >
              All projects
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px]">
            {PROJECTS.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onHover={setHovering}
              />
            ))}
          </div>
        </section>


        <section id="contact" className="relative z-[1] px-10 sm:px-16 pt-24 pb-48 max-w-[1400px] mx-auto text-center">
          <SectionLabel text="Contact" center />

          <h2
            className="font-syne font-extrabold leading-[0.9] tracking-[-0.04em] mb-8"
            style={{ fontSize: "clamp(40px,7.5vw,104px)" }}
            data-reveal
          >
            Let's build
            <br />
            <span className="outline-text">something</span>
            <br />
            together.
          </h2>

          <p className="text-sm text-[#5a6478] font-light leading-[1.85] max-w-sm mx-auto mb-12" data-reveal>
            Open to freelance projects, internships, and collaborations. Drop me
            a message — I respond within 24h.
          </p>

          <div className="flex justify-center gap-4 flex-wrap" data-reveal>
            <a
              href="mailto:islem@email.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-400 text-[#080b10] text-[13px] tracking-[0.05em] rounded font-mono-dm no-underline hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,229,255,0.28)] transition-all cursor-none"
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
            >
              Send an email
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,12 2,6" />
              </svg>
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-[#e8edf5] text-[13px] tracking-[0.05em] rounded border border-white/[0.07] font-mono-dm no-underline hover:border-white/30 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all cursor-none"
              onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative z-[1] px-10 sm:px-16 py-6 flex flex-col sm:flex-row justify-between items-center border-t border-white/[0.07] text-[11px] text-[#5a6478] tracking-[0.06em] gap-2">
          <span>Islem — Full Stack Developer</span>
          <span>Built with React & PHP · Algeria 🇩🇿</span>
        </footer>
      </div>
    </>
  );
}


function SectionLabel({ text, center }: { text: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-[10px] text-cyan-400 uppercase tracking-[0.2em] mb-14 ${center ? "justify-center" : ""}`}>
      <span className="w-6 h-px bg-cyan-400 block" />
      {text}
    </div>
  );
}

function ProjectCard({
  project,
  onHover,
}: {
  project: Project;
  onHover: (v: boolean) => void;
}) {
  const featured = project.featured;

  return (
    <div
      data-reveal
      className={`group relative border border-white/[0.07] bg-white/[0.03] hover:border-cyan-400/15 transition-all overflow-hidden cursor-none ${
        featured ? "lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center" : ""
      } p-10`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative z-10">
        <p className="text-[11px] text-[#5a6478] tracking-[0.1em] mb-5">
          {project.id}
          {featured ? " — Featured" : ""}
        </p>
        <h3
          className="font-syne font-bold leading-[1.08] tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(18px,2.2vw,30px)" }}
        >
          {project.title}
        </h3>
        <p className="text-[13px] text-[#5a6478] leading-[1.8] font-light mb-6">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2.5 py-0.5 rounded-full border border-white/[0.07] text-[#5a6478] tracking-[0.06em]"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 uppercase tracking-[0.08em] no-underline hover:gap-3 transition-all cursor-none"
        >
          View project
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {featured && (
        <div className="relative h-56 lg:h-full min-h-[220px] rounded-md border border-white/[0.07] flex items-center justify-center text-5xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,229,255,.05), rgba(255,107,53,.05))" }}>
          <div className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(rgba(0,229,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.03) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <span className="relative z-10">{project.emoji}</span>
        </div>
      )}
    </div>
  );
}