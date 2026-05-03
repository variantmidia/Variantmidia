"use client";

import { useEffect, useState } from "react";

const messages = [
  { from: "user", text: "Olá, gostaria de falar com um advogado trabalhista." },
  { from: "bot", text: "Oi! Me chamo Débora Borges, advogada trabalhista. Para te ajudar melhor, qual é o seu nome e o que você está enfrentando?" },
  { from: "user", text: "Carlos. Trabalhei 1 ano sem registro e não depositavam FGTS. Tenho direito?" },
  { from: "bot", text: "Entendi, Carlos. Pode haver vínculo mesmo sem registro. Você tinha horário fixo e chefe direto?" },
  { from: "user", text: "Sim, das 8h às 18h, com chefe direto." },
  { from: "bot", text: "Recebia salário todo mês? Ainda está na empresa?" },
  { from: "user", text: "Recebia no PIX. Saí faz 2 meses." },
  { from: "bot", text: "Há indícios de vínculo: registro retroativo, FGTS, férias e 13º. Tem provas? WhatsApp, comprovantes, testemunhas?" },
  { from: "user", text: "Tenho conversas no WhatsApp e os PIX." },
  { from: "bot", text: "Ótimo. Para analisar com precisão, vamos fazer uma reunião online. Prefere manhã ou tarde?" },
  { from: "user", text: "Tarde." },
  { from: "bot", text: "Tenho terça às 14h ou quarta às 15h. Qual fica melhor?" },
  { from: "user", text: "Quarta às 15h." },
  { from: "bot", text: "Marcado, Carlos! Quarta 15h via Google Meet. Vou te enviar o link em seguida." },
] as const;

const MESSAGE_DELAY = 2400;
const TYPING_DELAY = 900;
const HOLD_DELAY = 2500;
const FADE_DELAY = 1000;
const CYCLE = messages.length * MESSAGE_DELAY + HOLD_DELAY + FADE_DELAY;

export function TriageChatAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingIndex, setTypingIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);

    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleCount(messages.length);
      setTypingIndex(null);
      setFading(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const play = () => {
      setVisibleCount(0);
      setTypingIndex(null);
      setFading(false);

      messages.forEach((msg, index) => {
        const delay = index * MESSAGE_DELAY;

        if (msg.from === "bot") {
          timers.push(setTimeout(() => setTypingIndex(index), delay));
          timers.push(
            setTimeout(() => {
              setVisibleCount(index + 1);
              setTypingIndex(null);
            }, delay + TYPING_DELAY)
          );
          return;
        }

        timers.push(setTimeout(() => setVisibleCount(index + 1), delay));
      });

      timers.push(setTimeout(() => setFading(true), messages.length * MESSAGE_DELAY + HOLD_DELAY));
    };

    play();
    const interval = setInterval(play, CYCLE);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [reducedMotion]);

  const visibleMessages = reducedMotion ? messages.slice(-4) : messages.slice(0, visibleCount);
  const typingMessage = typingIndex !== null ? messages[typingIndex] : null;

  return (
    <div className="triage-phone pointer-events-none" aria-hidden="true">
      {/* Dynamic Island */}
      <div className="triage-phone__island" />

      {/* Status bar */}
      <div className="triage-phone__status">
        <span className="triage-phone__time">9:41</span>
        <div className="triage-phone__indicators">
          <svg width="15" height="10" viewBox="0 0 15 10" fill="currentColor">
            <rect x="0" y="4" width="3" height="6" rx="0.5" opacity="0.4" />
            <rect x="4" y="2.5" width="3" height="7.5" rx="0.5" opacity="0.6" />
            <rect x="8" y="1" width="3" height="9" rx="0.5" opacity="0.8" />
            <rect x="12" y="0" width="3" height="10" rx="0.5" />
          </svg>
          <svg width="22" height="10" viewBox="0 0 22 10" fill="currentColor">
            <rect x="0" y="0.5" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <rect x="1.5" y="2" width="12" height="6" rx="1" />
            <rect x="19" y="3" width="2.5" height="4" rx="0.8" opacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Chat header */}
      <div className="triage-phone__header">
        <span className="triage-phone__avatar">DB</span>
        <div>
          <span className="triage-phone__name">Dra. Débora Borges</span>
          <span className="triage-phone__online">online</span>
        </div>
      </div>

      {/* Chat screen */}
      <div
        className={`triage-chat triage-phone__screen ${fading ? "triage-chat--fading" : ""}`}
      >
        {visibleMessages.map((msg) => (
          <div
            key={msg.text}
            className={`triage-msg ${msg.from === "user" ? "triage-msg--user" : "triage-msg--bot"}`}
          >
            <span className="triage-text">{msg.text}</span>
          </div>
        ))}
        {typingMessage?.from === "bot" ? (
          <div className="triage-msg triage-msg--bot triage-msg--typing" key={`${typingMessage.text}-typing`}>
            <span className="triage-dots">
              <span className="triage-dot" />
              <span className="triage-dot" />
              <span className="triage-dot" />
            </span>
          </div>
        ) : null}
      </div>

      {/* Bottom bar / home indicator */}
      <div className="triage-phone__home">
        <span className="triage-phone__home-bar" />
      </div>
    </div>
  );
}
