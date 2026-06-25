"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOG_TEMPLATES = [
  "[SYS] Matrix Sieve Initialized",
  "[NODE] Aggregating Global Registries...",
  "[PROXY] Routing via ethnodock-engine.workers.dev",
  "[DATA] Extraction loop iteration: {i}",
  "[BIO] Sequencing historical flora data...",
  "[NET] Handshake with proxy established.",
  "[SIEVE] Pattern matching initialized.",
  "[CORE] Injecting RAG vectors...",
  "[SYS] Matrix isolation enabled.",
  "[NODE] Scattering requests to global edge...",
];

export function TelemetryStream() {
  const [logs, setLogs] = useState<{ id: number; text: string }[]>([]);
  const logIdRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
      const text = template.replace("{i}", Math.floor(Math.random() * 1000).toString());

      setLogs((prev) => {
        const nextLogs = [...prev, { id: logIdRef.current++, text }];
        if (nextLogs.length > 50) return nextLogs.slice(1);
        return nextLogs;
      });
    }, 100); // 100ms interval per requirements

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-1/4 p-4 sieve-border bg-black/40 backdrop-blur-sm z-20 overflow-hidden flex flex-col pointer-events-none">
      <div className="text-[10px] font-bold uppercase tracking-widest text-emerald/50 mb-4 flex justify-between">
        <span>Telemetry Stream</span>
        <span className="animate-pulse">● LIVE</span>
      </div>
      <div className="flex-1 font-mono text-[10px] space-y-0.5 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0 }} // 0ms transition preferred
              className="text-emerald/80 whitespace-nowrap"
            >
              <span className="text-emerald/30">{new Date().toLocaleTimeString('en-GB', { hour12: false })}.{(Date.now() % 1000).toString().padStart(3, '0')}</span> {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="h-16 bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0" />
    </div>
  );
}
