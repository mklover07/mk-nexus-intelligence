"use client";

import { useState } from "react";

export default function MobileIntelligence() {
  const [number, setNumber] = useState("");

  const isValidNumber = (value: string) => {
    return /^[0-9]{10,15}$/.test(value.replace(/\D/g, ""));
  };

  const valid = isValidNumber(number);

  const cleanNumber = number.replace(/\D/g, "");

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">
        Mobile Intelligence
      </h2>

      <input
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter Mobile Number"
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-4"
      />

      {number && (
        <div className="space-y-3">
          <div>
            <strong>Status:</strong>{" "}
            {valid ? (
              <span className="text-green-400">
                Valid Number
              </span>
            ) : (
              <span className="text-red-400">
                Invalid Number
              </span>
            )}
          </div>

          {valid && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              <a
                href={`https://www.google.com/search?q=${cleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 px-4 py-2 rounded text-center"
              >
                Google Search
              </a>

              <a
                href={`https://www.bing.com/search?q=${cleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 px-4 py-2 rounded text-center"
              >
                Bing Search
              </a>

              <a
                href={`https://wa.me/${cleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 px-4 py-2 rounded text-center"
              >
                WhatsApp
              </a>

              <a
                href="https://www.truecaller.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 px-4 py-2 rounded text-center"
              >
                Truecaller
              </a>

              <a
                href="https://sync.me"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-600 px-4 py-2 rounded text-center"
              >
                Sync.me
              </a>

              <a
                href="https://www.numlookup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 px-4 py-2 rounded text-center"
              >
                NumLookup
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}