"use client";

import { useState } from "react";

export default function IPIntelligence() {
  const [ip, setIp] = useState("");

  const isValidIP = (value: string) => {
    return /^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/.test(
      value
    );
  };

  const valid = isValidIP(ip);

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">
        IP Intelligence
      </h2>

      <input
        value={ip}
        onChange={(e) =>
          setIp(e.target.value)
        }
        placeholder="Enter IP Address"
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-4"
      />

      {ip && (
        <div className="space-y-3">
          <div>
            <strong>Status:</strong>{" "}
            {valid ? (
              <span className="text-green-400">
                Valid IP
              </span>
            ) : (
              <span className="text-red-400">
                Invalid IP
              </span>
            )}
          </div>

          {valid && (
            <div className="grid md:grid-cols-2 gap-2">
              <a
                href={`https://www.virustotal.com/gui/ip-address/${ip}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 px-4 py-2 rounded text-center"
              >
                VirusTotal
              </a>

              <a
                href={`https://www.abuseipdb.com/check/${ip}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 px-4 py-2 rounded text-center"
              >
                AbuseIPDB
              </a>

              <a
                href={`https://www.shodan.io/host/${ip}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 px-4 py-2 rounded text-center"
              >
                Shodan
              </a>

              <a
                href={`https://search.censys.io/search?resource=hosts&q=${ip}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 px-4 py-2 rounded text-center"
              >
                Censys
              </a>

              <a
                href={`https://viz.greynoise.io/ip/${ip}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-600 px-4 py-2 rounded text-center"
              >
                GreyNoise
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}