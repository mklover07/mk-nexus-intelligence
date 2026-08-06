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
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="Enter Email Address"
        className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 mb-4"
      />

      {email && (
        <div className="space-y-3">
          <div>
            <strong>Status:</strong>{" "}
            {valid ? (
              <span className="text-green-400">
                Valid Email
              </span>
            ) : (
              <span className="text-red-400">
                Invalid Email
              </span>
            )}
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

              <div className="grid md:grid-cols-2 gap-2 pt-3">
                <a
                  href={`https://who.is/whois/${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 px-4 py-2 rounded text-center"
                >
                  WHOIS Lookup
                </a>

                <a
                  href={`https://mxtoolbox.com/SuperTool.aspx?action=mx:${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 px-4 py-2 rounded text-center"
                >
                  MXToolbox
                </a>

                <a
                  href={`https://hunter.io/search/${domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-600 px-4 py-2 rounded text-center"
                >
                  Hunter.io
                </a>

                <a
                  href="https://haveibeenpwned.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 px-4 py-2 rounded text-center"
                >
                  Have I Been Pwned
                </a>

                <a
                  href={`https://emailrep.io/${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 px-4 py-2 rounded text-center"
                >
                  EmailRep
                </a>

                <a
                  href={`https://dehashed.com/search?query=${email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 px-4 py-2 rounded text-center"
                >
                  DeHashed
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}