"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface NodeGraphProps {
  results: { id: string; methodology: string }[];
}

export function NodeGraph({ results }: NodeGraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Generate 5-7 initial pulsing nodes if no results
    if (results.length === 0) {
      const initial = Array.from({ length: 6 }).map((_, i) => ({
        id: `init-${i}`,
        label: `IDLE_NODE_${i}`,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
      }));
      setNodes(initial);
      return;
    }

    // Re-aggregate on search
    const newNodes = results.map((res) => ({
      id: res.id,
      label: res.methodology,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
    }));
    setNodes(newNodes);
  }, [results]);

  const cubicEase = [0.645, 0.045, 0.355, 1] as [number, number, number, number];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const prev = nodes[i - 1];
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={`${prev.x}%`}
              y1={`${prev.y}%`}
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="currentColor"
              className="text-emerald"
              strokeWidth="0.5"
              layout
              transition={{
                duration: shouldReduceMotion ? 0 : 0.8,
                ease: cubicEase
              }}
            />
          );
        })}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          layout
          style={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            ease: cubicEase
          }}
          className="pointer-events-auto"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-12 sieve-border bg-black/80 flex items-center justify-center p-2 text-center"
          >
            <div className="text-[8px] font-mono text-emerald uppercase tracking-tighter leading-none truncate">
              {node.label}
            </div>

            {/* Corner Indicators */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-emerald/50" />
            <div className="absolute bottom-0 right-0 w-1 h-1 bg-electric-blue/50" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
