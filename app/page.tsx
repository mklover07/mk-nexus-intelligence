"use client";

import { useState, useEffect } from "react";
import { tools } from "./tools";

import Sidebar from "./Sidebar";
import RecentTools from "./RecentTools";
import DomainLookup from "./DomainLookup";
import EmailIntelligence from "./EmailIntelligence";
import IPIntelligence from "./IPIntelligence";
import ThreatIntelligence from "./ThreatIntelligence";
import RiskDashboard from "./RiskDashboard";
import IOCTracker from "./IOCTracker";
import CaseManagement from "./CaseManagement";
import CaseTimeline from "./CaseTimeline";
import EvidenceVault from "./EvidenceVault";
import MobileIntelligence from "./MobileIntelligence";
import InvestigationNotes from "./InvestigationNotes";
import DashboardStats from "./DashboardStats";
import ReportGenerator from "./ReportGenerator";

export default function Home() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [openCases, setOpenCases] = useState(0);
  const [closedCases, setClosedCases] = useState(0);

  useEffect(() => {
    const savedFavorites =
      localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedCases =
      localStorage.getItem("mk_cases");

    if (savedCases) {
      const cases = JSON.parse(savedCases);

      setOpenCases(
        cases.filter(
          (c: { status: string }) =>
            c.status === "Open"
        ).length
      );

      setClosedCases(
        cases.filter(
          (c: { status: string }) =>
            c.status === "Closed"
        ).length
      );
    }
  }, []);

  const toggleFavorite = (toolName: string) => {
    let updated: string[];

    if (favorites.includes(toolName)) {
      updated = favorites.filter(
        (item) => item !== toolName
      );
    } else {
      updated = [...favorites, toolName];
    }

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  const trackToolOpen = (toolName: string) => {
    const existing = JSON.parse(
      localStorage.getItem("recent_tools") || "[]"
    );

    const updated = [
      toolName,
      ...existing.filter(
        (item: string) => item !== toolName
      ),
    ].slice(0, 5);

    localStorage.setItem(
      "recent_tools",
      JSON.stringify(updated)
    );
  };

  const categories = [
    "All",
    ...new Set(tools.map((tool) => tool.category)),
  ];

  const filtered = tools.filter((tool) => {
    const matchesSearch =
      tool.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      tool.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">

        </div>          <h1 className="text-5xl font-bold mb-2">
            MK Nexus Intelligence
          </h1>

          <p className="mb-6 text-gray-400">
            Cyber Intelligence | Digital Investigations |
            OSINT Research
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
              <h3>Total Tools</h3>
              <p className="text-3xl font-bold">
                {tools.length}
              </p>
            </div>

            <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
              <h3>Categories</h3>
              <p className="text-3xl font-bold">
                {
                  new Set(
                    tools.map((t) => t.category)
                  ).size
                }
              </p>
            </div>

            <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
              <h3>Favorites</h3>
              <p className="text-3xl font-bold">
                {favorites.length}
              </p>
            </div>

            <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
              <h3>Brand</h3>
              <p className="font-bold">
                MK Global Nexus
              </p>
            </div>

            <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
              <h3>Open Cases</h3>
              <p className="text-3xl font-bold">
                {openCases}
              </p>
            </div>

            <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
              <h3>Closed Cases</h3>
              <p className="text-3xl font-bold">
                {closedCases}
              </p>
            </div>
          </div>

          <div className="mb-12">
            <DashboardStats />
          </div>

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search Tools..."
            className="w-full p-3 rounded bg-zinc-900 border border-zinc-800 mb-4"
          />

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`px-4 py-2 rounded ${
                  selectedCategory === category
                    ? "bg-blue-600"
                    : "bg-zinc-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {favorites.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                ⭐ Favorite Tools
              </h2>

              <div className="flex flex-wrap gap-2">
                {favorites.map((fav) => (
                  <span
                    key={fav}
                    className="bg-yellow-600 px-3 py-1 rounded"
                  >
                    {fav}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <div
                key={tool.name}
                className="bg-zinc-900 border border-zinc-800 p-5 rounded"
              >
                <h3 className="text-lg font-bold">
                  {tool.name}
                </h3>

                <p className="text-blue-400 text-sm mt-1">
                  {tool.category}
                </p>

                <p className="text-gray-400 text-sm mt-2">
                  {tool.description}
                </p>

                <div className="flex gap-2 mt-4">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackToolOpen(tool.name)
                    }
                    className="bg-blue-600 px-4 py-2 rounded"
                  >
                    Open Tool
                  </a>

                  <button
                    onClick={() =>
                      toggleFavorite(tool.name)
                    }
                    className="bg-zinc-800 px-4 py-2 rounded"
                  >
                    {favorites.includes(tool.name)
                      ? "⭐"
                      : "☆"}
                  </button>
                </div>
              </div>
            ))}
          </div>          <div className="mt-12">
            <RecentTools />
          </div>

          <div className="mt-12">
            <DomainLookup />
          </div>

          <div className="mt-12">
            <EmailIntelligence />
          </div>

          <div className="mt-12">
            <IPIntelligence />
          </div>

          <div className="mt-12">
            <ThreatIntelligence />
          </div>

          <div className="mt-12">
            <RiskDashboard />
          </div>

          <div className="mt-12">
            <IOCTracker />
          </div>

          <div className="mt-12">
            <CaseManagement />
          </div>

          <div className="mt-12">
            <CaseTimeline />
          </div>

          <div className="mt-12">
            <EvidenceVault />
          </div>

          <div className="mt-12">
            <MobileIntelligence />
          </div>

          <div className="mt-12">
            <InvestigationNotes />
          </div>

          <div className="mt-12">
            <ReportGenerator />
          
          <footer className="mt-16 border-t border-zinc-800 pt-6 text-center text-gray-500">
            <p className="font-semibold">
              MK Nexus Intelligence Platform
            </p>

            <p className="mt-2">
              Powered by MK Global Nexus © 2026
            </p>

            <p className="text-xs mt-3">
              Cyber Intelligence | Digital Investigations |
              OSINT Research | Threat Intelligence |
              Digital Forensics
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
}