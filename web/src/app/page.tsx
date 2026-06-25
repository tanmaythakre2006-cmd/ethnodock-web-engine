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
    // Don't clear immediately for layout shift effect
    try {
      const sieveResults = await executeDarkSieve(query, "MOCK_KEY");
      setResults(sieveResults);
    } catch (error) {
      console.error("Sieve execution failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full bg-background overflow-hidden">
      {/* Telemetry Stream Left Panel */}
      <TelemetryStream />

      {/* Main Matrix Canvas */}
      <div className="flex-1 ml-[25%] relative flex flex-col items-center justify-center p-8">

        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center gap-12">
          <header className="text-center">
            <h1 className="text-5xl font-black uppercase tracking-tighter glow-text mb-1 italic text-emerald">
              Cybernetic Sieve
            </h1>
            <p className="text-[8px] text-emerald/40 uppercase tracking-[0.8em] font-bold">
              Reasoning Engine :: Bio-Informatics Extraction
            </p>
          </header>

          <SearchInterface onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Floating Nodes Layer */}
        <NodeGraph results={results} />

        <footer className="fixed bottom-4 right-6 flex gap-8 text-[6px] text-emerald/20 uppercase font-mono tracking-widest">
          <span>Protocol: UI UX Pro Max v2.0</span>
          <span>Arch: System 161 applied</span>
          <span>© EthnoDock Core</span>
        </footer>
      </div>
    </main>
  );
}
