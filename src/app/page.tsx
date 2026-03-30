"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Activity, Shield, Cpu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Reveal animation
    gsap.from(".reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
    });
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="z-10 text-center px-4">
        <div className="reveal inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/5 text-green-400 text-xs font-mono mb-6">
          <Activity size={14} className="animate-pulse" />
          SYSTEM_STATUS: OPERATIONAL
        </div>

        <h1 className="reveal text-7xl md:text-9xl font-black tracking-tighter mb-4 italic uppercase">
          LOG
          <span className="text-green-500 underline decoration-2 underline-offset-8">
            PULSE
          </span>
        </h1>

        <p className="reveal text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-mono">
          {`>_`} Monitor errors at the speed of thought. Low latency
          observability for modern stacks.
        </p>

        <div className="reveal flex flex-wrap gap-4 justify-center">
          <Link
            href="/login"
            className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-green-500 transition-colors"
          >
            Enter Console
            <div className="absolute -inset-1 bg-green-500 opacity-20 blur group-hover:opacity-60 transition-opacity" />
          </Link>
          <Link
            href="/docs"
            className="px-8 py-4 border border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-sm transition-all"
          >
            {/* <button className="px-8 py-4 border border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-sm transition-all"> */}
            Documentation
            {/* </button> */}
          </Link>
        </div>
      </div>

      {/* Floating System Stats (Decorative) */}
      <div className="absolute bottom-10 left-10 hidden lg:block text-[10px] font-mono text-slate-600 space-y-1">
        <p>REGION: ASIA-SOUTH-1</p>
        <p>LATENCY: 12ms</p>
        <p>UPTIME: 99.998%</p>
      </div>
    </main>
  );
}
