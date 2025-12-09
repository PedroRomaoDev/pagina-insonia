"use client"

import { useState } from "react"
import { ArrowLeft, Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const passos = [
  {
    id: 1,
    titulo: "Desconectar da Tela",
    descricao: "Desligue todos os dispositivos eletrônicos. A luz azul interfere na produção de melatonina, o hormônio do sono.",
    instrucoes: [
      "Coloque o celular no modo avião",
      "Desligue TV e computador",
      "Deixe aparelhos fora do quarto"
    ]
  },
  {
    id: 2,
    titulo: "Alongamento Simples",
    descricao: "Movimentos suaves para liberar tensões acumuladas no corpo durante o dia.",
    instrucoes: [
      "Alongue pescoço girando suavemente",
      "Estique braços acima da cabeça",
      "Rotacione ombros para trás 5 vezes",
      "Alongue pernas sentado na cama"
    ]
  },
  {
    id: 3,
    titulo: "Respiração 4-7-8",
    descricao: "Técnica comprovada para acalmar o sistema nervoso e induzir o sono rapidamente.",
    instrucoes: [
      "Inspire pelo nariz contando até 4",
      "Segure a respiração contando até 7",
      "Expire pela boca contando até 8",
      "Repita 4 ciclos completos"
    ]
  },
  {
    id: 4,
    titulo: "Pensamento Positivo",
    descricao: "Finalize com gratidão e intenções positivas para um sono reparador.",
    instrucoes: [
      "Pense em 3 coisas boas do seu dia",
      "Agradeça mentalmente por cada uma",
      "Visualize-se acordando descansado",
      "Repita: 'Meu corpo sabe como dormir'"
    ]
  }
]

export default function RitualPage() {
  const [passoAtual, setPassoAtual] = useState(0)
  const [concluidos, setConcluidos] = useState<number[]>([])

  const passo = passos[passoAtual]
  const isUltimoPasso = passoAtual === passos.length - 1

  const handleConcluir = () => {
    if (!concluidos.includes(passo.id)) {
      setConcluidos([...concluidos, passo.id])
    }

    if (isUltimoPasso) {
      // Ritual completo
      return
    }

    setPassoAtual(passoAtual + 1)
  }

  const progresso = ((passoAtual + 1) / passos.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1929] via-[#1A2847] to-[#0B1929] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1929]/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <div className="text-sm text-gray-400">
            Passo {passoAtual + 1} de {passos.length}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Step Number Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl text-2xl font-bold shadow-lg">
              {passo.id}
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {passo.titulo}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {passo.descricao}
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl border border-purple-500/30 p-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-300">Como fazer:</h2>
            <ul className="space-y-4">
              {passo.instrucoes.map((instrucao, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-lg text-gray-200 leading-relaxed pt-1">
                    {instrucao}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-8">
            {isUltimoPasso && concluidos.includes(passo.id) ? (
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl rounded-2xl hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-105"
              >
                <Check className="w-6 h-6" />
                Ritual Completo!
              </Link>
            ) : (
              <button
                onClick={handleConcluir}
                className="inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-xl rounded-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105"
              >
                {isUltimoPasso ? "Concluir Ritual" : "Concluir e Avançar"}
                <ArrowRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Completed Steps */}
          {concluidos.length > 0 && (
            <div className="flex justify-center gap-2 pt-4">
              {passos.map((p) => (
                <div
                  key={p.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    concluidos.includes(p.id)
                      ? "bg-green-500 scale-110"
                      : "bg-gray-700"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
