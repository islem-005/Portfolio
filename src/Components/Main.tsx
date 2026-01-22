import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Code,
  Palette,
  Zap,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { PFP } from "../images/images";




export default function PortfolioLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);


  const projects = [
    {
      title: "DZ Job Finder",
      description:
        "A location‑aware job marketplace connecting Algerian talent with verified employers.",
      impact: "Reduced job search friction by 40% (beta)",
      tags: ["Vue.js", "Node.js", "MongoDB", "REST"],
    },
    {
      title: "AI Content Generator",
      description:
        "AI‑driven content generation platform for marketing and editorial workflows.",
      impact: "Automated content creation pipelines",
      tags: ["Python", "TensorFlow", "Flask", "NLP"],
    },
    {
      title: "Mobile Fitness App",
      description:
        "Cross‑platform fitness tracking with analytics and social engagement.",
      impact: "Real‑time progress tracking",
      tags: ["React Native", "Firebase", "Redux"],
    },
    {
      title: "AGLIC Corporate Platform",
      description:
        "Enterprise‑grade corporate website for an insurance company.",
      impact: "Improved digital presence and brand trust",
      tags: ["React", "Firebase", "Redux"],
    },
  ];

  const skills = [
    {
      icon: Code,
      title: "Engineering",
      desc: "Designing scalable architectures and clean, maintainable codebases.",
    },
    {
      icon: Palette,
      title: "Product & UX",
      desc: "User‑centric interfaces with strong visual hierarchy and usability.",
    },
    {
      icon: Zap,
      title: "Performance",
      desc: "Optimizing load times, runtime efficiency, and accessibility.",
    },
  ];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();

        const serviceID = 'service_h9sapna';
        const templateID = 'template_axr01fv';
        const publicKEY = '3qcUS95Ai_6du1ipC';

        const templateParams = {
            from_name : name,
            from_email : email,
            to_name : 'Islem',
            message : message
        }

        emailjs.send(serviceID, templateID, templateParams, publicKEY)
            .then((response) => {
                console.log("Email send successfully!", response);
                setName("");
                setEmail("");
                setMessage("")
                setSent(!sent)

                setTimeout(() => {
                    setSent(sent)
                }, 2000)
              })
            .catch((error) => {
                console.error('Error sending the eamil', error)
            })

            console.log(message);
    }

    const handleReset = () => {

    }




  return (
    <div className="scrollbar-hide h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory bg-gradient-to-br from-slate-800 via-slate-600 to-slate-800 text-white">
    
    {sent && 
        <AnimatePresence>
    <motion.div
      className="fixed top-6 left-5 z-[100]"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-4 min-w-[320px] border border-green-100">
        <div className="flex items-start gap-3">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              {/* Ping effect */}
              <motion.div
                className="absolute inset-0 bg-green-500/20 rounded-full"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <div className="flex-1">
            <strong className="font-bold text-gray-900 block">
              Success!
            </strong>
            <span className="text-gray-600 text-sm">
              Your email has been sent successfully.
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  </AnimatePresence>
    }

      {/* NAVIGATION */}
      <nav className="fixed top-0 z-50 w-full backdrop-blur-xl border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          <a href="/">Islem</a>
          </span>

          <div className="hidden xl:flex items-center gap-6 text-sm">
            {['home', 'about', 'projects', 'contact'].map((item) => (
              <a key={item} href={`#${item}`} className="group relative">
                <span className="capitalize group-hover:text-cyan-400 transition-colors pr-5">
                  {item}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all" />
              </a>
            ))}
          </div>

          <button className="xl:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-slate-900/40 border-t border-white/5"
            >
              <div className="flex flex-col items-center py-6 gap-4">
                {['home', 'about', 'projects', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="capitalize text-slate-300 hover:text-cyan-400 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
        <section
          id="home"
          className="snap-start min-h-screen pt-32 px-6 flex items-center justify-center relative overflow-hidden"
        >
          {/* Animated background glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 -z-10"
          >

          </motion.div>

          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* LEFT – TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm backdrop-blur">
                <Sparkles size={16} />
                Open for Opportunities
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6">
                Building{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Digital Experiences
                </span>
                <br />
                That Scale
              </h1>

              <p className="text-slate-400 max-w-xl mb-10 text-lg leading-relaxed">
                I’m <span className="text-slate-200 font-medium">Islem</span>, a full-stack
                developer focused on crafting performant, scalable web and mobile
                applications with clean architecture and modern technologies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-9 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-medium text-slate-900 hover:shadow-2xl hover:shadow-cyan-500/30 transition"
                >
                  View Projects <ArrowRight size={18} />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-9 py-3 rounded-xl border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 transition"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>


            {/* RIGHT – IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center md:justify-end"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-40" />
                <img
                  src={PFP}
                  alt="Islem"
                  className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full object-cover ring-2 ring-cyan-500/40"
                />
              </div>
            </motion.div>
          </div>
        </section>


      {/* ABOUT */}
      <section id="about" className="snap-start min-h-screen px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Core Expertise</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="rounded-2xl p-8 bg-slate-800/50 border border-slate-700 hover:border-cyan-500/40 transition"
              >
                <skill.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-slate-400">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="snap-start min-h-screen px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">Selected Projects</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl overflow-hidden bg-slate-800/40 border border-slate-700 hover:border-cyan-500/40 transition"
              >
                <div className="h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-slate-400 mb-3">{project.description}</p>
                  <p className="text-xs text-cyan-400 mb-4">{project.impact}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="snap-start min-h-screen px-6 py-24 ">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let’s Build Something Great</h2>
          <p className="text-slate-400 mb-10">
            Available for freelance projects, collaborations, and full‑time opportunities.
          </p>

          <div className="flex justify-center gap-6">
            <a href="https://github.com/islem-005" className="p-4 rounded-full bg-slate-800 hover:bg-cyan-500 transition">
              <Github />
            </a>
            <a href="https://linkedin.com" className="p-4 rounded-full bg-slate-800 hover:bg-cyan-500 transition">
              <Linkedin />
            </a>
            <a href="mailto:hello@example.com" className="p-4 rounded-full bg-slate-800 hover:bg-cyan-500 transition">
              <Mail />
            </a>
          </div>
        </div>

        <div className="max-w-md mx-auto  bg-slate-800 rounded-2xl shadow-lg p-6 mt-20">
        <h2 className="text-2xl font-semibold text-white mb-4">
            Send a Direct Message
        </h2>

        <form action="" onSubmit={handleSubmit} method="POST" className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-white mb-1">
                Your Name
            </label>
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-indigo-950"
                placeholder="Name"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-white mb-1">
                Email Address
            </label>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-indigo-950"
                placeholder="email@example.com"
            />
            </div>

                <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Message
                </label>
                <textarea
                    name="message"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-indigo-950"
                    placeholder="Write your message here..."
                ></textarea>
                </div>

                <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition text-indigo-950"
                >
                Send Email
                </button>
            </form>
            </div>

      </section>

      <footer className="snap-start py-8 border-t border-slate-800 text-center text-slate-500">
        © {new Date().getFullYear()} Islem. All rights reserved.
      </footer>
    </div>
  );
}
