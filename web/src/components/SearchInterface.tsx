"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Terminal, Cpu, Network } from "lucide-react";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchInterface({ onSearch, isLoading }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  const cubicEase = [0.645, 0.045, 0.355, 1] as [number, number, number, number];

  return (
    <div className="relative z-30 w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: cubicEase
        }}
        className="bg-black sieve-border p-6 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
      >
        <div className="flex items-center justify-between mb-4 border-b sieve-border pb-2 opacity-50">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-emerald" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-emerald">Command Matrix v2.0</span>
          </div>
          <div className="flex gap-4">
            <Cpu className="w-3 h-3 text-emerald" />
            <Network className="w-3 h-3 text-electric-blue" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-3">
            <span className="text-emerald font-bold">{">"}</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="INITIALIZE SEARCH SEQUENCE..."
              className="w-full bg-transparent border-none outline-none text-emerald placeholder:text-emerald/20 font-mono text-sm"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="mt-6 w-full sieve-border-blue bg-electric-blue/5 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-electric-blue hover:bg-electric-blue/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all ease-in-out-cubic duration-0"
          >
            {isLoading ? "ANALYZING MATRIX..." : "EXECUTE SIEVE"}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-[6px] font-mono text-emerald/40 uppercase">
          <span>Core: System 161 Rules Applied</span>
          <span>Status: Ready</span>
        </div>
      </motion.div>
    </div>
  );
}
