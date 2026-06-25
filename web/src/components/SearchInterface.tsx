"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, ShieldAlert } from "lucide-react";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchInterface({ onSearch, isLoading }: SearchInterfaceProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query);
    }
  };

  return (
    <div className="relative z-20 w-full max-w-2xl mx-auto mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/60 backdrop-blur-xl border border-green-500/30 p-8 rounded-lg glow-border"
      >
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="text-green-500 w-5 h-5" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-green-500/80">
            Secure Entry Point :: Global Matrix Sieve
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ENTER SEARCH PARAMETERS..."
            className="w-full bg-green-500/5 border border-green-500/20 rounded p-4 pl-12 text-green-400 placeholder:text-green-900 focus:outline-none focus:border-green-500/50 transition-all font-mono text-sm"
            autoFocus
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-green-500 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-green-500/40" />
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="mt-4 w-full bg-green-500/10 border border-green-500/40 py-2 text-xs font-bold uppercase tracking-[0.2em] text-green-500 hover:bg-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? "Executing Extraction..." : "Initialize Sieve"}
          </button>
        </form>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-green-500/10 pt-6">
          <div className="text-center">
            <div className="text-[10px] text-green-500/40 uppercase">Proxy Status</div>
            <div className="text-[10px] text-green-400 font-bold uppercase">Active</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-green-500/40 uppercase">RAG Engine</div>
            <div className="text-[10px] text-green-400 font-bold uppercase">Gemini-Pro</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] text-green-500/40 uppercase">Budget</div>
            <div className="text-[10px] text-green-400 font-bold uppercase">$0.00 Fixed</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
