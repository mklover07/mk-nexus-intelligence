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

export default function IOCTracker() {
  const [iocs, setIocs] = useState<IOC[]>([]);
  const [type, setType] = useState("IP");
  const [value, setValue] = useState("");
  const [risk, setRisk] = useState("Medium");

  useEffect(() => {
    const saved = localStorage.getItem("ioc_tracker");

    if (saved) {
      setIocs(JSON.parse(saved));
    }
  }, []);

  const saveIOCs = (data: IOC[]) => {
    setIocs(data);
    localStorage.setItem(
      "ioc_tracker",
      JSON.stringify(data)
    );
  };

  const addIOC = () => {
    if (!value.trim()) return;

    const newIOC: IOC = {
      id: Date.now(),
      type,
      value,
      risk,
      status: "Active",
      createdAt: new Date().toLocaleString(),
    };

    saveIOCs([newIOC, ...iocs]);
    setValue("");
  };

  const removeIOC = (id: number) => {
    saveIOCs(iocs.filter((ioc) => ioc.id !== id));
  };

  const activeCount = iocs.filter(
    (i) => i.status === "Active"
  ).length;

  const highRiskCount = iocs.filter(
    (i) => i.risk === "High"
  ).length;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-6">
        IOC Tracker
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-800 p-4 rounded">
          <h3>Total IOC</h3>
          <p className="text-3xl font-bold">
            {iocs.length}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <h3>Active IOC</h3>
          <p className="text-3xl font-bold">
            {activeCount}
          </p>
        </div>

        <div className="bg-zinc-800 p-4 rounded">
          <h3>High Risk</h3>
          <p className="text-3xl font-bold text-red-400">
            {highRiskCount}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded p-3"
        >
          <option>IP</option>
          <option>Domain</option>
          <option>URL</option>
          <option>Email</option>
          <option>MD5</option>
          <option>SHA256</option>
        </select>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="IOC Value"
          className="bg-zinc-800 border border-zinc-700 rounded p-3"
        />

        <select
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded p-3"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <button
          onClick={addIOC}
          className="bg-blue-600 rounded p-3"
        >
          Add IOC
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-700">
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Value</th>
              <th className="text-left p-3">Risk</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Added</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {iocs.map((ioc) => (
              <tr
                key={ioc.id}
                className="border-b border-zinc-800"
              >
                <td className="p-3">{ioc.type}</td>
                <td className="p-3 break-all">
                  {ioc.value}
                </td>
                <td className="p-3">
                  {ioc.risk}
                </td>
                <td className="p-3">
                  {ioc.status}
                </td>
                <td className="p-3">
                  {ioc.createdAt}
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      removeIOC(ioc.id)
                    }
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}