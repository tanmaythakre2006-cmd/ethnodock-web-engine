"use client";

import { useState } from "react";
import { TelemetryStream } from "@/components/TelemetryStream";
import { SearchInterface } from "@/components/SearchInterface";
import { NodeGraph } from "@/components/NodeGraph";
import { executeDarkSieve } from "@/lib/engine";

export default function Home() {
  const [results, setResults] = useState<{ id: string; methodology: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setResults([]);
    try {
      const sieveResults = await executeDarkSieve(query);
      setResults(sieveResults);
    } catch (error) {
      console.error("Sieve execution failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      {/* Visual background layers */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05)_0,transparent_100%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />

      <TelemetryStream />

      <div className="relative z-10 w-full max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black uppercase tracking-tighter glow-text mb-2 italic">
            EthnoDock :: Core Sieve
          </h1>
          <p className="text-[10px] text-green-500/60 uppercase tracking-[0.5em] font-bold">
            Proprietary Global Matrix Data Extraction Layer
          </p>
        </header>

        <SearchInterface onSearch={handleSearch} isLoading={isLoading} />

        <div className="relative h-[400px] mt-12">
          <NodeGraph results={results} />
        </div>
      </div>

      <footer className="fixed bottom-4 right-4 text-[8px] text-green-500/30 uppercase font-mono">
        v2.0.0-alpha // scatter-gather active // cors-proxy-v1
      </footer>
    </main>
  );
}
