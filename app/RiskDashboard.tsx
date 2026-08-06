"use client";

import { useEffect, useState } from "react";

interface IOC {
  id: number;
  type: string;
  value: string;
  risk: string;
  status: string;
  createdAt: string;
}

export default function RiskDashboard() {
  const [iocs, setIocs] = useState<IOC[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("ioc_tracker");

    if (saved) {
      setIocs(JSON.parse(saved));
    }
  }, []);

  const calculateScore = () => {
    let score = 0;

    iocs.forEach((ioc) => {
      switch (ioc.risk) {
        case "Low":
          score += 25;
          break;
        case "Medium":
          score += 50;
          break;
        case "High":
          score += 75;
          break;
        case "Critical":
          score += 100;
          break;
      }
    });

    return score;
  };

  const totalScore = calculateScore();

  const critical = iocs.filter(
    (i) => i.risk === "Critical"
  ).length;

  const high = iocs.filter(
    (i) => i.risk === "High"
  ).length;

  const medium = iocs.filter(
    (i) => i.risk === "Medium"
  ).length;

  const low = iocs.filter(
    (i) => i.risk === "Low"
  ).length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-6">
        Threat Risk Dashboard
      </h2>

      <div className="grid md:grid-cols-5 gap-4">
        <div className="bg-zinc-800 p-4 rounded">
          <h3>Total Risk Score</h3>
          <p className="text-3xl font-bold">
            {totalScore}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <h3>Critical</h3>
          <p className="text-3xl font-bold text-red-500">
            {critical}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <h3>High</h3>
          <p className="text-3xl font-bold text-orange-400">
            {high}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <h3>Medium</h3>
          <p className="text-3xl font-bold text-yellow-400">
            {medium}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <h3>Low</h3>
          <p className="text-3xl font-bold text-green-400">
            {low}
          </p>
        </div>
      </div>
    </div>
  );
}