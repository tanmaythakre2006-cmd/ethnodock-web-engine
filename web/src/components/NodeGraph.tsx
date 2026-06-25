"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
}

interface NodeGraphProps {
  results: { id: string; methodology: string }[];
}

export function NodeGraph({ results }: NodeGraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    if (results.length === 0) {
      setNodes([]);
      return;
    }

    const newNodes = results.map((res, i) => ({
      id: res.id,
      label: res.methodology,
      x: Math.random() * 70 + 15, // 15% to 85%
      y: Math.random() * 70 + 15, // 15% to 85%
      size: Math.random() * 40 + 80,
    }));
    setNodes(newNodes);
  }, [results]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Centralized Connection Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const prev = nodes[i - 1];
          return (
            <motion.line
              key={`line-${node.id}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              x1={`${prev.x}%`}
              y1={`${prev.y}%`}
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="#00ff41"
              strokeWidth="1"
              transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
            />
          );
        })}
      </svg>

      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: i * 0.1
          }}
          style={{
            position: "absolute",
            width: node.size,
            height: node.size,
            marginLeft: -node.size / 2,
            marginTop: -node.size / 2,
          }}
          className="pointer-events-auto"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full border border-green-500/40 bg-green-500/5 backdrop-blur-md rounded-lg flex items-center justify-center p-2 text-center group hover:border-green-400 hover:bg-green-500/20 transition-colors cursor-crosshair shadow-[0_0_15px_rgba(0,255,65,0.1)]"
          >
            <div className="text-[10px] font-mono text-green-400 glow-text uppercase tracking-tighter leading-tight">
              {node.label}
            </div>

            {/* Corner Brackets */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-green-500/60" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-green-500/60" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-green-500/60" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-green-500/60" />

            {/* Status Indicator */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-green-500 rounded-full animate-pulse" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
