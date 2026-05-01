"use client";

import type { CSSProperties } from "react";

const messages = [
  { from: "user", text: "Preciso de orientação sobre rescisão" },
  { from: "bot", text: "Entendi. É rescisão direta ou indireta?" },
  { from: "user", text: "Indireta, por falta de pagamento" },
  { from: "bot", text: "Há quanto tempo o salário está atrasado?" },
  { from: "user", text: "3 meses" },
  { from: "bot", text: "Caso qualificado · Encaminhando →" }
] as const;

const MSG_DELAY = 1.8;
const CYCLE = messages.length * MSG_DELAY + 2;

export function TriageChatAnimation() {
  return (
    <div
      className="triage-chat pointer-events-none absolute inset-0 flex flex-col justify-end overflow-hidden p-4 pt-14"
      aria-hidden="true"
    >
      {messages.map((msg, index) => (
        <div
          key={msg.text}
          className={`triage-msg ${msg.from === "user" ? "triage-msg--user" : "triage-msg--bot"}`}
          style={{
            "--msg-delay": `${index * MSG_DELAY}s`,
            "--msg-cycle": `${CYCLE}s`
          } as CSSProperties}
        >
          <span className="triage-dots">
            <span className="triage-dot" />
            <span className="triage-dot" />
            <span className="triage-dot" />
          </span>
          <span className="triage-text">{msg.text}</span>
        </div>
      ))}
    </div>
  );
}
