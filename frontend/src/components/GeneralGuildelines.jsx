import React, { useState } from "react";
import { motion } from "framer-motion";

const guidelines = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    ),
    text: "All participants must complete identity verification at the Registration desks before the event begins.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Problem Statements will be released on the day of the hackathon. Prepare to adapt and ascend.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    text: "Each team must have a minimum of 2 and a maximum of 4 members, including the team leader. Cross-college teams are welcome.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    text: "Participants should be enrolled in a full-time undergraduate degree program.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    text: "Teams will be shortlisted based on Round 1 submissions. Only the worthy ascend.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    text: "The hackathon includes 24 hours of coding, followed by presentations to the judging panel.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m4.162-6.492C20.834 5.174 22.5 8.076 22.5 11.393a13.9 13.9 0 01-4.23 9.982M7.73 9.728a6.726 6.726 0 002.748 1.35m3.044 0a6.726 6.726 0 002.749-1.35m0 0a15.906 15.906 0 01-6.543 1.379c-2.262 0-4.427-.473-6.381-1.327" />
      </svg>
    ),
    text: "Results will be announced after all presentations are reviewed by the judges.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    text: "Each team must select one problem statement and develop a viable software solution for it.",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    text: "Teams can freely use available servers or their own infrastructure for development and presentation.",
  },
];

const GeneralGuidelines = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="guidelines"
      className="relative py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Section background overlay — matches About / Domains */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />

      {/* Decorative blurs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="text-white">General </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
              Guidelines
            </span>
          </h2>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-purple-500/50" />
            <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]" />
            <div className="h-px w-16 bg-linear-to-l from-transparent to-purple-500/50" />
          </div>

          <p className="max-w-lg mx-auto text-gray-300 text-base leading-relaxed">
            Study the protocols before you step into the arena.
          </p>
        </motion.div>

        {/* Guidelines List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="space-y-2.5"
        >
          {guidelines.map((guideline, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Connector Line (vertical) */}
              {index < guidelines.length - 1 && (
                <div
                  className="absolute left-5.75 top-12 w-px h-[calc(100%-8px)] z-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(139,92,246,0.25), transparent)",
                  }}
                />
              )}

              <div
                className="relative flex items-center gap-4 px-4 py-3.5 rounded-xl border backdrop-blur-sm transition-all duration-500 cursor-default"
                style={{
                  background:
                    hoveredIndex === index
                      ? "rgba(139,92,246,0.08)"
                      : "rgba(139,92,246,0.02)",
                  borderColor:
                    hoveredIndex === index
                      ? "rgba(139,92,246,0.3)"
                      : "rgba(139,92,246,0.08)",
                  boxShadow:
                    hoveredIndex === index
                      ? "0 0 25px rgba(139,92,246,0.1), inset 0 0 15px rgba(139,92,246,0.05)"
                      : "none",
                }}
              >
                {/* Step Number + Icon */}
                <div className="shrink-0 relative">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500"
                    style={{
                      background:
                        hoveredIndex === index
                          ? "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.2))"
                          : "rgba(255,255,255,0.05)",
                      border:
                        hoveredIndex === index
                          ? "1px solid rgba(139,92,246,0.4)"
                          : "1px solid rgba(255,255,255,0.08)",
                      color:
                        hoveredIndex === index
                          ? "#c4b5fd"
                          : "rgba(156,163,175,0.6)",
                    }}
                  >
                    {guideline.icon}
                  </div>
                  {/* Step Number Badge */}
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center transition-all duration-500"
                    style={{
                      background:
                        hoveredIndex === index
                          ? "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(99,102,241,0.9))"
                          : "rgba(255,255,255,0.05)",
                      border:
                        hoveredIndex === index
                          ? "1px solid rgba(167,139,250,0.6)"
                          : "1px solid rgba(255,255,255,0.08)",
                      color:
                        hoveredIndex === index ? "#fff" : "rgba(156,163,175,0.5)",
                      boxShadow:
                        hoveredIndex === index
                          ? "0 0 12px rgba(139,92,246,0.4)"
                          : "none",
                      transform:
                        hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <p
                    className="text-sm leading-relaxed transition-colors duration-500"
                    style={{
                      color:
                        hoveredIndex === index
                          ? "rgba(229,231,235,0.9)"
                          : "rgba(156,163,175,0.7)",
                    }}
                  >
                    {guideline.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-14 text-center"
        >
          <div className="inline-block relative">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-linear-to-r from-transparent to-purple-500/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/60 shadow-[0_0_8px_rgba(167,139,250,0.4)]" />
              <div className="h-px w-16 bg-linear-to-l from-transparent to-purple-500/40" />
            </div>
            <p className="text-gray-400 italic text-lg font-light tracking-wide">
              "Innovation stops climbing familiar ladders{" "}
              <br className="hidden sm:block" />
              and starts building its own."
            </p>
            <p className="text-purple-400/40 text-xs tracking-[0.3em] uppercase mt-4">
              Beyond the Ascension
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GeneralGuidelines;
