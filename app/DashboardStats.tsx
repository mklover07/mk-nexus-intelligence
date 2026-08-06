"use client";

import { useEffect, useState } from "react";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalCases: 0,
    openCases: 0,
    criticalCases: 0,
    totalEvidence: 0,
    totalIOC: 0,
    timelineEvents: 0,
  });

  useEffect(() => {
    const loadStats = () => {
      const cases = JSON.parse(
        localStorage.getItem("mk_cases") || "[]"
      );

      const evidence = JSON.parse(
        localStorage.getItem("evidence_vault") || "[]"
      );

      const iocs = JSON.parse(
        localStorage.getItem("ioc_tracker") || "[]"
      );

      const timeline = JSON.parse(
        localStorage.getItem("mk_timeline") || "[]"
      );

      setStats({
        totalCases: cases.length,
        openCases: cases.filter(
          (c: { status: string }) =>
            c.status === "Open"
        ).length,

        criticalCases: cases.filter(
          (c: { priority: string }) =>
            c.priority === "Critical"
        ).length,

        totalEvidence: evidence.length,
        totalIOC: iocs.length,
        timelineEvents: timeline.length,
      });
    };

    loadStats();

    const interval = setInterval(loadStats, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
        <p className="text-gray-400">
          Total Cases
        </p>
        <h3 className="text-3xl font-bold">
          {stats.totalCases}
        </h3>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
        <p className="text-gray-400">
          Open Cases
        </p>
        <h3 className="text-3xl font-bold text-yellow-400">
          {stats.openCases}
        </h3>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
        <p className="text-gray-400">
          Critical Cases
        </p>
        <h3 className="text-3xl font-bold text-red-500">
          {stats.criticalCases}
        </h3>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
        <p className="text-gray-400">
          Evidence
        </p>
        <h3 className="text-3xl font-bold text-cyan-400">
          {stats.totalEvidence}
        </h3>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
        <p className="text-gray-400">
          IOC Records
        </p>
        <h3 className="text-3xl font-bold text-green-400">
          {stats.totalIOC}
        </h3>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
        <p className="text-gray-400">
          Timeline Events
        </p>
        <h3 className="text-3xl font-bold text-purple-400">
          {stats.timelineEvents}
        </h3>
      </div>
    </div>
  );
}