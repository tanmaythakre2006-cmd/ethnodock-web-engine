"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, Activity, Zap, Shield, Database, Cpu, Globe } from "lucide-react";

// --- Types ---
interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface DataNode {
  id: string;
  label: string;
  x: number;
  y: number;
  category: "Ayurveda" | "TCM" | "Unani";
}

// --- Constants ---
const REGISTRY_MATRIX_ENDPOINT = "https://ethnodock-engine.workers.dev";
const CORE_REGISTRY_BASE = "https://en.wikipedia.org/api/rest_v1/page/summary/";

const INITIAL_NODES: DataNode[] = [
  { id: "node-1", label: "Prakriti Analysis", x: 30, y: 40, category: "Ayurveda" },
  { id: "node-2", label: "Qi Flow Mapping", x: 60, y: 30, category: "TCM" },
  { id: "node-3", label: "Mizaj Balancing", x: 50, y: 70, category: "Unani" },
  { id: "node-4", label: "Herb Registry", x: 20, y: 60, category: "Ayurveda" },
  { id: "node-5", label: "Meridian Points", x: 80, y: 50, category: "TCM" },
];

// --- Sub-components ---
const TypingText = ({ text, className }: { text: string; className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [text]);

  return <span className={className}>{displayedText}</span>;
};

export default function CoreSieve() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // --- Telemetry Log Helper ---
  const addLog = (message: string, type: LogEntry["type"] = "info") => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      message,
      type,
    };
    setLogs((prev) => [...prev.slice(-20), newLog]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // --- Core Logic: Dark Sieve Execution ---
  async function executeDarkSieve() {
    if (!searchQuery) return;

    setIsSearching(true);
    setLogs([]);
    addLog("Initializing Sieve Protocol...", "info");

    try {
      addLog("Establishing handshake with Global Registry Matrix...", "info");
      await new Promise(r => setTimeout(r, 800));

      addLog("Rotating proxy identities...", "warning");
      await new Promise(r => setTimeout(r, 600));

      addLog(`Injecting query: ${searchQuery}`, "success");

      const targetUrl = `${CORE_REGISTRY_BASE}${searchQuery}`;
      const response = await fetch(`${REGISTRY_MATRIX_ENDPOINT}?url=${encodeURIComponent(targetUrl)}`, {
        headers: {
          'x-target-url': targetUrl
        }
      });

      addLog("Extracting raw cultural telemetry...", "info");
      await new Promise(r => setTimeout(r, 1000));

      if (response.ok) {
        const data = await response.json();
        addLog(`Extraction complete: ${data.title}`, "success");
        addLog(`Data Density: ${JSON.stringify(data).length} bytes`, "info");
      } else {
        addLog("Sieve node rejection: Access Denied", "error");
      }
    } catch (err) {
      addLog("CRITICAL: Matrix connection failure", "error");
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-background text-text-main overflow-hidden flex flex-col font-mono">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* --- 1. Core Search Matrix (Top Center) --- */}
      <header className="relative z-10 w-full pt-12 pb-8 px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-none blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-surface border border-primary/30 px-4 py-3">
              <Search className="text-primary mr-3 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && executeDarkSieve()}
                placeholder="EXECUTE CORE SIEVE QUERY..."
                className="bg-transparent border-none outline-none w-full text-primary placeholder:text-primary/30 uppercase tracking-widest text-sm"
              />
              {isSearching && <Activity className="animate-spin text-secondary ml-2 w-5 h-5" />}
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center text-[10px] text-primary/60 tracking-tighter uppercase px-1">
            <span>Protocol: ETHNO-DOCK v2.0.4</span>
            <span>Registry: GLOBAL_MATRIX_CONNECTED</span>
          </div>
        </motion.div>
      </header>

      <div className="relative z-10 flex flex-1 w-full overflow-hidden">
        {/* --- 2. Live Telemetry Stream (Left Sidebar) --- */}
        <aside className="w-1/4 min-w-[300px] border-r border-primary/20 bg-surface/50 backdrop-blur-sm flex flex-col">
          <div className="p-4 border-b border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-widest uppercase">Telemetry Stream</span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-secondary" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-primary/20">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-[10px] leading-tight"
                >
                  <span className="text-text-muted">[{log.timestamp}]</span>{" "}
                  <TypingText
                    text={log.message}
                    className={
                      log.type === "success" ? "text-primary" :
                      log.type === "error" ? "text-red-500" :
                      log.type === "warning" ? "text-secondary" :
                      "text-text-main"
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={logEndRef} />
          </div>
        </aside>

        {/* --- 3. Methodology Node Graph (Main Canvas) --- */}
        <section className="flex-1 relative overflow-hidden">
          <div className="absolute top-4 right-4 flex flex-col gap-4 z-20">
             <div className="p-3 bg-surface border border-secondary/30 shadow-glow-blue flex items-center gap-3">
                <Shield className="w-5 h-5 text-secondary" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-muted uppercase">Security Layer</span>
                  <span className="text-xs text-secondary font-bold uppercase">BYOK Active</span>
                </div>
             </div>
             <div className="p-3 bg-surface border border-primary/30 shadow-glow-emerald flex items-center gap-3">
                <Database className="w-5 h-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-text-muted uppercase">Buffer Status</span>
                  <span className="text-xs text-primary font-bold uppercase">Serverless-Ready</span>
                </div>
             </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full pointer-events-none">
               <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Draw lines between nodes */}
              {INITIAL_NODES.map((node, i) => {
                const nextNode = INITIAL_NODES[(i + 1) % INITIAL_NODES.length];
                return (
                  <line
                    key={`line-${i}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${nextNode.x}%`}
                    y2={`${nextNode.y}%`}
                    stroke="rgba(16,185,129,0.1)"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>

            {INITIAL_NODES.map((node) => (
              <motion.div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-crosshair group"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
                  <div className="relative w-3 h-3 bg-primary border border-white/20 shadow-glow-emerald" />
                  <div className="absolute top-4 left-4 whitespace-nowrap bg-surface/80 border border-primary/30 px-2 py-1 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] uppercase tracking-tighter text-primary">[{node.category}]</span>
                    <div className="text-[11px] font-bold text-text-main">{node.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* HUD Decorative Elements */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
            <div className="flex flex-col gap-1">
              <div className="flex gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-[10px] uppercase text-primary/80 tracking-widest">Sieve Sourcing Node: 0x82A..F</span>
              </div>
              <div className="w-48 h-1 bg-primary/10 relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary shadow-glow-emerald"
                  animate={{ width: ["0%", "100%", "40%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </div>
            <div className="flex gap-8">
               <div className="flex flex-col items-end">
                  <span className="text-[8px] text-text-muted uppercase tracking-widest">Core Sync</span>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(i => (
                      <motion.div
                        key={i}
                        className="w-1 h-3 bg-secondary/40"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ delay: i * 0.2, duration: 1, repeat: Infinity }}
                      />
                    ))}
                  </div>
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[8px] text-text-muted uppercase tracking-widest">System Load</span>
                  <div className="text-xs text-primary font-bold">12.4%</div>
               </div>
            </div>
          </div>
        </section>
      </div>

      {/* Corner Accents */}
      <div className="fixed top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 m-4 pointer-events-none" />
      <div className="fixed top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 m-4 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 m-4 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 m-4 pointer-events-none" />
    </main>
  );
}
