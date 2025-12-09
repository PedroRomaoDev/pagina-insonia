"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";

const sons = [
  {
    id: "chuva",
    nome: "Chuva",
    descricao: "Som suave de chuva caindo",
    cor: "from-blue-600/20 to-cyan-600/20",
    corBorda: "border-blue-500/30",
    corHover: "hover:border-blue-400/60",
    corSombra: "hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]",
    audioUrl:
      "https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3",
  },
  {
    id: "mar",
    nome: "Mar",
    descricao: "Ondas quebrando na praia",
    cor: "from-cyan-600/20 to-teal-600/20",
    corBorda: "border-cyan-500/30",
    corHover: "hover:border-cyan-400/60",
    corSombra: "hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]",
    audioUrl:
      "https://assets.mixkit.co/active_storage/sfx/2488/2488-preview.mp3",
  },
  {
    id: "floresta",
    nome: "Floresta",
    descricao: "Sons da natureza e pássaros",
    cor: "from-green-600/20 to-emerald-600/20",
    corBorda: "border-green-500/30",
    corHover: "hover:border-green-400/60",
    corSombra: "hover:shadow-[0_0_40px_rgba(34,197,94,0.4)]",
    audioUrl:
      "https://assets.mixkit.co/active_storage/sfx/2450/2450-preview.mp3",
  },
  {
    id: "ventilador",
    nome: "Ventilador",
    descricao: "Ruído branco relaxante",
    cor: "from-gray-600/20 to-slate-600/20",
    corBorda: "border-gray-500/30",
    corHover: "hover:border-gray-400/60",
    corSombra: "hover:shadow-[0_0_40px_rgba(107,114,128,0.4)]",
    audioUrl:
      "https://assets.mixkit.co/active_storage/sfx/2443/2443-preview.mp3",
  },
];

export default function SonsPage() {
  const [tocando, setTocando] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [mudo, setMudo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup ao desmontar
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = (somId: string, audioUrl: string) => {
    if (tocando === somId) {
      // Pausar
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setTocando(null);
    } else {
      // Parar áudio anterior
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Criar novo áudio
      const audio = new Audio(audioUrl);
      audio.loop = true;
      audio.volume = mudo ? 0 : volume;
      audio.play();
      audioRef.current = audio;
      setTocando(somId);
    }
  };

  const handleVolumeChange = (novoVolume: number) => {
    setVolume(novoVolume);
    if (audioRef.current) {
      audioRef.current.volume = mudo ? 0 : novoVolume;
    }
  };

  const toggleMudo = () => {
    const novoMudo = !mudo;
    setMudo(novoMudo);
    if (audioRef.current) {
      audioRef.current.volume = novoMudo ? 0 : volume;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1929] via-[#1A2847] to-[#0B1929] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1929]/80 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          {tocando && (
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMudo}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {mudo ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-24 accent-cyan-500"
              />
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Sons Relaxantes
            </h1>
            <p className="text-xl text-gray-300">
              Escolha um som ambiente para relaxar e adormecer
            </p>
          </div>

          {/* Sound Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sons.map((som) => {
              const estaTocando = tocando === som.id;

              return (
                <button
                  key={som.id}
                  onClick={() => handlePlay(som.id, som.audioUrl)}
                  className={`group relative bg-gradient-to-br ${
                    som.cor
                  } p-8 rounded-3xl border ${som.corBorda} ${
                    som.corHover
                  } transition-all duration-300 hover:scale-105 ${
                    som.corSombra
                  } text-left ${estaTocando ? "ring-2 ring-white/50" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">
                      {som.nome}
                    </h3>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        estaTocando ? "bg-white/20" : "bg-white/10"
                      }`}
                    >
                      {estaTocando ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300">{som.descricao}</p>

                  {estaTocando && (
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-1 h-4 bg-white/60 rounded-full animate-pulse"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-white/80">Tocando...</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl border border-purple-500/30 p-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">
              Dicas de uso:
            </h2>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start gap-3">
                <span className="text-purple-400">•</span>
                <span>Ajuste o volume para um nível confortável</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">•</span>
                <span>Os sons tocam em loop contínuo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">•</span>
                <span>
                  Combine com a respiração guiada para melhores resultados
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400">•</span>
                <span>Deixe tocando enquanto adormece</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
