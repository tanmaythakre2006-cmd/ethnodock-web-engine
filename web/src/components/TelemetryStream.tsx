"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOG_TEMPLATES = [
  "[SYS] Bypassing CORS...",
  "[NODE] Aggregating historical registries...",
  "[NET] Handshake with proxy established.",
  "[SIEVE] Pattern matching initialized.",
  "[DATA] Extraction loop iteration: {i}",
  "[AUTH] BYOK Handshake verified.",
  "[CORE] Injecting RAG vectors...",
  "[SYS] Matrix isolation enabled.",
  "[WARN] High latency detected in sub-node.",
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
        if (nextLogs.length > 20) return nextLogs.slice(1);
        return nextLogs;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 p-4 border-r border-green-500/20 bg-black/40 backdrop-blur-sm z-10 overflow-hidden flex flex-col pointer-events-none">
      <div className="text-[10px] uppercase tracking-widest text-green-500/50 mb-4 font-bold">
        Telemetry Stream :: Core Sieve
      </div>
      <div className="flex-1 font-mono text-[10px] space-y-1">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              className="text-green-400/80"
            >
              <span className="text-green-600/40">[{new Date().toLocaleTimeString()}]</span> {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="h-8 bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0" />
    </div>
  );
}
