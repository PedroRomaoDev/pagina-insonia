"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

interface RegistroDiario {
  id: string
  data: string
  horaDormir: string
  notaAcordar: number
  observacoes: string
}

export default function DiarioPage() {
  const [horaDormir, setHoraDormir] = useState("")
  const [notaAcordar, setNotaAcordar] = useState(5)
  const [observacoes, setObservacoes] = useState("")
  const [registros, setRegistros] = useState<RegistroDiario[]>([])
  const [salvando, setSalvando] = useState(false)

  // Carregar registros do localStorage
  useEffect(() => {
    const registrosSalvos = localStorage.getItem("diario-sono")
    if (registrosSalvos) {
      setRegistros(JSON.parse(registrosSalvos))
    }
  }, [])

  const handleSalvar = () => {
    if (!horaDormir) {
      alert("Por favor, informe o horário que foi dormir")
      return
    }

    setSalvando(true)

    const novoRegistro: RegistroDiario = {
      id: Date.now().toString(),
      data: new Date().toISOString().split("T")[0],
      horaDormir,
      notaAcordar,
      observacoes
    }

    const novosRegistros = [novoRegistro, ...registros]
    setRegistros(novosRegistros)
    localStorage.setItem("diario-sono", JSON.stringify(novosRegistros))

    // Limpar formulário
    setTimeout(() => {
      setHoraDormir("")
      setNotaAcordar(5)
      setObservacoes("")
      setSalvando(false)
    }, 500)
  }

  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO + "T00:00:00")
    return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
  }

  const calcularMedia = () => {
    if (registros.length === 0) return 0
    const soma = registros.reduce((acc, reg) => acc + reg.notaAcordar, 0)
    return (soma / registros.length).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1929] via-[#1A2847] to-[#0B1929] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B1929]/80 backdrop-blur-lg border-b border-indigo-500/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{registros.length} registros</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Diário do Sono
            </h1>
            <p className="text-xl text-gray-300">
              Registre e acompanhe a qualidade do seu sono
            </p>
          </div>

          {/* Stats */}
          {registros.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl border border-indigo-500/30 p-6 text-center">
                <div className="text-4xl font-bold text-indigo-400">{registros.length}</div>
                <div className="text-sm text-gray-300 mt-2">Noites registradas</div>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30 p-6 text-center">
                <div className="text-4xl font-bold text-purple-400">{calcularMedia()}</div>
                <div className="text-sm text-gray-300 mt-2">Média de qualidade</div>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl border border-blue-500/30 p-6 text-center">
                <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Progresso</div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl border border-indigo-500/30 p-8">
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Novo Registro</h2>
            
            <div className="space-y-6">
              {/* Hora de Dormir */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Que horas você foi dormir?
                </label>
                <input
                  type="time"
                  value={horaDormir}
                  onChange={(e) => setHoraDormir(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Nota ao Acordar */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Como você se sentiu ao acordar? (1-10)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={notaAcordar}
                    onChange={(e) => setNotaAcordar(parseInt(e.target.value))}
                    className="flex-1 accent-indigo-500"
                  />
                  <div className="w-16 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-2xl font-bold text-indigo-400">
                    {notaAcordar}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Péssimo</span>
                  <span>Excelente</span>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Ex: Acordei durante a noite, sonhei muito, etc."
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Botão Salvar */}
              <button
                onClick={handleSalvar}
                disabled={salvando}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg rounded-xl hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {salvando ? "Salvando..." : "Salvar Registro"}
              </button>
            </div>
          </div>

          {/* Histórico */}
          {registros.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-indigo-300">Histórico</h2>
              <div className="space-y-4">
                {registros.map((registro) => (
                  <div
                    key={registro.id}
                    className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-2xl border border-indigo-500/30 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-lg font-bold text-white">
                          {formatarData(registro.data)}
                        </div>
                        <div className="text-sm text-gray-400">
                          Dormiu às {registro.horaDormir}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Qualidade:</span>
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center text-xl font-bold text-indigo-400">
                          {registro.notaAcordar}
                        </div>
                      </div>
                    </div>
                    {registro.observacoes && (
                      <p className="text-gray-300 text-sm bg-white/5 rounded-lg p-3">
                        {registro.observacoes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {registros.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhum registro ainda. Comece registrando sua primeira noite!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
