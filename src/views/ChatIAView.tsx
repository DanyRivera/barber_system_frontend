import { useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";

import { chatIA } from "../api";
import { TypingIndicator } from "../components/ChatIA/TypingIndicator";
import { MensajeIA } from "../components/ChatIA/MensajeIA";
import { MensajeUser } from "../components/ChatIA/MensajeUser";
import type { Mensaje } from "../types";


const toApiMessages = (mensajes: Mensaje[]) =>
  mensajes
    .filter((m) => m.id !== "1")
    .map((m) => ({
      role: (m.rol === "ia" ? "assistant" : "user") as "user" | "assistant",
      content: m.texto,
    }));

export default function ChatIAView() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: "1",
      rol: "ia",
      texto: "¡Hola! Soy tu asistente de Barber System 💈 Estoy aquí para ayudarte a gestionar tu agenda, resolver dudas sobre tus citas o darte recomendaciones. ¿En qué puedo ayudarte hoy?",
      hora: "09:00",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  const { mutate, isPending } = useMutation({
    mutationFn: chatIA,
    onSuccess: (res) => {
      const iaMsg: Mensaje = {
        id: (Date.now() + 1).toString(),
        rol: "ia",
        texto: res.response,
        hora: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      };

      setMensajes((prev) => [...prev, iaMsg]);
    },
    onError: () => {
      const errorMsg: Mensaje = {
        id: (Date.now() + 1).toString(),
        rol: "ia",
        texto: "Ocurrió un error al conectar con el asistente. Intenta de nuevo. 💈",
        hora: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      };
      setMensajes((prev) => [...prev, errorMsg]);
    }
  });

  const enviar = async () => {
    if (!input.trim()) return;

    const userMsg: Mensaje = {
      id: Date.now().toString(),
      rol: "user",
      texto: input.trim(),
      hora: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    };

    const nuevoHistorial = [...mensajes, userMsg];
    setMensajes(nuevoHistorial);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    mutate({ messages: toApiMessages(nuevoHistorial) })
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviar();
    }
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col animate-fadeUp"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>


      {/* ── Área de mensajes ── */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col gap-5 scroll-smooth">

        {/* Intro chip */}
        <div className="flex justify-center">
          <span className="text-[10px] tracking-[2px] uppercase text-[#333] border border-[#1e1e1e] rounded-full px-4 py-1.5">
            Hoy — Conversación iniciada
          </span>
        </div>

        {/* Mensajes */}
        {mensajes.map((msg, i) =>
          msg.rol === "ia"
            ? <MensajeIA key={msg.id} msg={msg} delay={i * 40} />
            : <MensajeUser key={msg.id} msg={msg} delay={i * 40} />
        )}

        {/* Indicador escribiendo */}
        {isPending && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="mt-3 bg-[#111] border border-[#1e1e1e] rounded-2xl px-4 py-3 flex items-end gap-3 transition-all duration-200 focus-within:border-gold/30">

        {/* Avatar usuario */}
        <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-xs text-gold shrink-0 mb-0.5"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          CB
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu pregunta... (Enter para enviar)"
          rows={1}
          className="flex-1 bg-transparent text-sm text-[#eee] placeholder-[#333] outline-none resize-none leading-relaxed py-1.5 max-h-35"
        />

        {/* Botón enviar */}
        <button
          onClick={enviar}
          disabled={!input.trim()}
          className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 mb-0.5
            ${input.trim() || isPending
              ? "bg-gold hover:bg-gold-light active:scale-95 text-[#0d0d0d]"
              : "bg-[#1a1a1a] text-[#333] cursor-not-allowed"
            }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>

      {/* Hint */}
      <p className="text-center text-[10px] text-[#2a2a2a] mt-2 tracking-wide">
        Shift + Enter para salto de línea
      </p>

    </div>
  );
}

