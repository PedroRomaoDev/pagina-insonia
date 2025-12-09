"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"

type Fase = "inspirar" | "segurar" | "expirar" | "pausa"

const faseConfig = {
  inspirar: { duracao: 4, texto: "Inspire pelo nariz", cor: "from-blue-500 to-cyan-500" },
  segurar: { duracao: 7, texto: "Segure a respiração", cor: "from-purple-500 to-pink-500" },
  expirar: { duracao: 8, texto: "Expire pela boca", cor: "from-orange-500 to-red-500" },
  pausa: { duracao: 2, texto: "Pausa", cor: "from-gray-500 to-gray-600" }
}

export default function RespiracaoPage() {
  const [ativo, setAtivo] = useState(false)
  const [fase, setFase] = useState<Fase>("inspirar")
  const [contador, setContador] = useState(4)
  const [ciclo, setCiclo] = useState(1)
  const totalCiclos = 7

  useEffect(() => {
    if (!ativo) return

    const interval = setInterval(() => {
      setContador((prev) => {
        if (prev > 1) return prev - 1

        // Transição de fase
        if (fase === "inspirar") {
          setFase("segurar")
          return faseConfig.segurar.duracao
        } else if (fase === "segurar") {
          setFase("expirar")
          return faseConfig.expirar.duracao
        } else if (fase === "expirar") {
          setFase("pausa")
          return faseConfig.pausa.duracao
        } else {
          // Fim do ciclo
          if (ciclo < totalCiclos) {
            setCiclo(ciclo + 1)
            setFase("inspirar")
            return faseConfig.inspirar.duracao
          } else {
            // Fim dos 7 ciclos
            setAtivo(false)
            return prev
          }
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [ativo, fase, ciclo])

  const handleIniciar = () => {
    setAtivo(true)
  }

  const handlePausar = () => {
    setAtivo(false)
  }

  const handleReiniciar = () => {
    setAtivo(false)
    setFase("inspirar")
    setContador(4)
    setCiclo(1)
  }

  const config = faseConfig[fase]
  const progresso = ((ciclo - 1) / totalCiclos) * 100
  const circuloScale = fase === "inspirar" ? "scale-150" : fase === "expirar" ? "scale-75" : "scale-100"

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1929] via-[#1A2847] to-[#0B1929] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1929]/80 backdrop-blur-lg border-b border-blue-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <div className="text-sm text-gray-400">
            Ciclo {ciclo} de {totalCiclos}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="space-y-12 text-center w-full">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Respiração 4-7-8
            </h1>
            <p className="text-xl text-gray-300">
              Técnica comprovada para acalmar a mente e induzir o sono
            </p>
          </div>

          {/* Breathing Circle */}
          <div className="relative flex items-center justify-center h-80">
            <div
              className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${config.cor} opacity-30 blur-2xl transition-all duration-1000 ${circuloScale}`}
            />
            <div
              className={`relative w-56 h-56 rounded-full bg-gradient-to-br ${config.cor} flex flex-col items-center justify-center shadow-2xl transition-all duration-1000 ${circuloScale}`}
            >
              <div className="text-7xl font-bold">{contador}</div>
              <div className="text-lg font-semibold mt-2 text-white/90">{config.texto}</div>
            </div>
          </div>

          {/* Instructions */}
          {!ativo && ciclo === 1 && (
            <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-3xl border border-blue-500/30 p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-blue-300">Como funciona:</h2>
              <ul className="space-y-3 text-left text-gray-200">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold">1.</span>
                  <span>Inspire pelo nariz por 4 segundos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span>Segure a respiração por 7 segundos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold">3.</span>
                  <span>Expire pela boca por 8 segundos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gray-400 font-bold">4.</span>
                  <span>Repita por 7 ciclos completos</span>
                </li>
              </ul>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            {!ativo ? (
              <button
                onClick={handleIniciar}
                className="inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xl rounded-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-105"
              >
                <Play className="w-6 h-6" />
                {ciclo === 1 ? "Iniciar" : "Continuar"}
              </button>
            ) : (
              <button
                onClick={handlePausar}
                className="inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xl rounded-2xl hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-all duration-300 hover:scale-105"
              >
                <Pause className="w-6 h-6" />
                Pausar
              </button>
            )}

            {ciclo > 1 && (
              <button
                onClick={handleReiniciar}
                className="inline-flex items-center gap-3 px-8 py-6 bg-gray-700 text-white font-bold text-lg rounded-2xl hover:bg-gray-600 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
                Reiniciar
              </button>
            )}
          </div>

          {/* Completion Message */}
          {ciclo === totalCiclos && !ativo && (
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-3xl border border-green-500/40 p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-green-400 mb-4">🎉 Parabéns!</h2>
              <p className="text-xl text-gray-200">
                Você completou os 7 ciclos. Seu corpo está relaxado e pronto para dormir.
              </p>
              <Link
                href="/"
                className="inline-block mt-6 px-8 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
              >
                Voltar ao Início
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
