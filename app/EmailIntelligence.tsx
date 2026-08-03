"use client";

import { useState } from "react";

export default function EmailIntelligence() {
  const [email, setEmail] = useState("");

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const valid = isValidEmail(email);

  const username = valid
    ? email.split("@")[0]
    : "";

  const domain = valid
    ? email.split("@")[1]
    : "";

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">
        Email Intelligence
      </h2>

      <input
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Enter email address"
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-4"
      />

      {email && (
        <div className="space-y-3">
          <div>
            <strong>Status:</strong>{" "}
            {valid ? "Valid Email" : "Invalid Email"}
          </div>

          {valid && (
            <>
              <div>
                <strong>Username:</strong>{" "}
                {username}
              </div>

              <div>
                <strong>Domain:</strong>{" "}
                {domain}
              </div>

              <div className="flex flex-wrap gap-2 pt-3">
                <a
                  href={`https://who.is/whois/${domain}`}
                  target="_blank"
                  className="bg-blue-600 px-4 py-2 rounded"
                >
                  WHOIS
                </a>

                <a
                  href={`https://mxtoolbox.com/SuperTool.aspx?action=mx:${domain}`}
                  target="_blank"
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  MXToolbox
                </a>

                <a
                  href={`https://hunter.io/search/${domain}`}
                  target="_blank"
                  className="bg-purple-600 px-4 py-2 rounded"
                >
                  Hunter
                </a>

                <a
                  href={`https://haveibeenpwned.com`}
                  target="_blank"
                  className="bg-red-600 px-4 py-2 rounded"
                >
                  HIBP
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}