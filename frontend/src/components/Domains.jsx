import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Blocks, Brain } from "lucide-react";
import AIMLImage from "../assets/aiml.png";
import WebAppDevImage from "../assets/web_app.png";
import BlockchainImage from "../assets/blockChain.png";
// Placeholders — replace with real images later


const domainIcons = {
  "Web/App Development": Code,
  Blockchain: Blocks,
  "AI/ML": Brain,
};

const Domains = () => {
  const domains = [
    {
      title: "Web/App Development",
      tagline: "Construct the Interface",
      description:
        "Craft responsive websites and cross-platform mobile apps with the latest technologies.",
      image: WebAppDevImage,
      accentFrom: "rgba(59,130,246,0.8)",
      accentTo: "rgba(99,102,241,0.6)",
      accentColor: "#3b82f6",
    },
    {
      title: "Blockchain",
      tagline: "Architect the Immutable",
      description:
        "Empower decentralized solutions and building blockchain applications for the future.",
      image: BlockchainImage,
      accentFrom: "rgba(52,211,153,0.8)",
      accentTo: "rgba(59,130,246,0.6)",
      accentColor: "#34d399",
    },
    {
      title: "AI/ML",
      tagline: "Synthesize Intelligence",
      description:
        "Explore artificial intelligence and machine learning to solve complex problems.",
      image: AIMLImage,
      accentFrom: "rgba(167,139,250,0.8)",
      accentTo: "rgba(236,72,153,0.6)",
      accentColor: "#a78bfa",
    },
  ];

  return (
    <section
      id="domains"
      className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Section background overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-950/20 to-transparent pointer-events-none" />

      {/* Decorative blurs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="text-white">Choose Your </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
              Domain
            </span>
          </h2>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-purple-500/50" />
            <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]" />
            <div className="h-px w-16 bg-linear-to-l from-transparent to-purple-500/50" />
          </div>

          <p className="max-w-xl mx-auto text-gray-300 text-lg leading-relaxed">
            Pick your path to reshape the systems of tomorrow.
          </p>
        </motion.div>

        {/* Domain Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {domains.map((domain, index) => (
            <DomainCard key={index} domain={domain} index={index} />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-purple-400/40 text-sm tracking-[0.3em] uppercase">
            Beyond the Ascension
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Flip Card ─── */
const DomainCard = ({ domain, index }) => {
  const IconComponent = domainIcons[domain.title];
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 60,
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full h-[480px]"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s ease-in-out",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
          {/* ══════════ FRONT FACE ══════════ */}
          <div
            className="absolute inset-0 rounded-2xl border backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "rgba(139,92,246,0.05)",
              borderColor: "rgba(139,92,246,0.15)",
            }}
          >
            {/* Animated gradient orb */}
            <div
              className="absolute w-48 h-48 rounded-full blur-[80px] opacity-20 animate-pulse"
              style={{
                background: `linear-gradient(135deg, ${domain.accentFrom}, ${domain.accentTo})`,
              }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-purple-400/30 animate-pulse"
                  style={{
                    top: `${15 + i * 14}%`,
                    left: `${10 + ((i * 17) % 80)}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${2 + i * 0.5}s`,
                  }}
                />
              ))}
            </div>

            {/* Icon */}
            <div
              className="relative z-10 mb-8 transition-transform duration-500 group-hover:scale-90"
              style={{ color: "white" }}
            >
              {IconComponent && <IconComponent size={65} strokeWidth={1} />}
            </div>

            {/* Title */}
            <h3
              className="relative z-10 text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text mb-3"
              style={{
                backgroundImage: `linear-gradient(135deg, ${domain.accentFrom}, ${domain.accentTo})`,
                textAlign: "center",
              }}
            >
              {domain.title}
            </h3>

            {/* Decorative corner borders */}
            <div className="absolute top-0 right-0 p-5 opacity-30">
              <div
                className="w-14 h-14 rounded-tr-xl"
                style={{
                  borderTop: `2px solid ${domain.accentColor}40`,
                  borderRight: `2px solid ${domain.accentColor}40`,
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 p-5 opacity-30">
              <div
                className="w-14 h-14 rounded-bl-xl"
                style={{
                  borderBottom: `2px solid ${domain.accentColor}40`,
                  borderLeft: `2px solid ${domain.accentColor}40`,
                }}
              />
            </div>
          </div>

          {/* ══════════ BACK FACE ══════════ */}
          <div
            className="absolute inset-0 rounded-2xl border backdrop-blur-sm overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "rgba(139,92,246,0.05)",
              borderColor: "rgba(139,92,246,0.15)",
            }}
          >
            {/* Image Layer */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 z-10 opacity-100"
                // style={{
                //   background: `linear-gradient(135deg, ${domain.accentFrom}, ${domain.accentTo})`,
                // }}
              />
              <div className="absolute inset-0 z-20 bg-linear-to-t from-[#0a0a20] via-[#0a0a20]/70 to-[#0a0a20]/30" />
              <img
                src={domain.image}
                alt={domain.title}
                className="w-full h-full object-cover opacity-100 scale-110 grayscale-[30%]"
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-30 p-8 flex flex-col justify-end">
              {/* Tagline */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="h-0.5 w-8"
                  style={{
                    background: `linear-gradient(90deg, ${domain.accentFrom}, ${domain.accentTo})`,
                  }}
                />
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-purple-300/70">
                  {domain.tagline}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                {domain.title}
              </h3>

              {/* Description */}
              <p className="text-purple-200/60 text-sm leading-relaxed mb-4">
                {domain.description}
              </p>
            </div>

            {/* Decorative corner borders */}
            <div className="absolute top-0 right-0 p-5 opacity-50">
              <div
                className="w-14 h-14 rounded-tr-xl"
                style={{
                  borderTop: "2px solid rgba(139,92,246,0.4)",
                  borderRight: "2px solid rgba(139,92,246,0.4)",
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 p-5 opacity-50">
              <div
                className="w-14 h-14 rounded-bl-xl"
                style={{
                  borderBottom: "2px solid rgba(139,92,246,0.4)",
                  borderLeft: "2px solid rgba(139,92,246,0.4)",
                }}
              />
            </div>

            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 0 30px rgba(139,92,246,0.1), 0 0 40px rgba(139,92,246,0.15)",
              }}
            />
          </div>
        </div>
    </motion.div>
  );
};

export default Domains;
