"use client"

import { Moon, Wind, Music, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1929] via-[#1A2847] to-[#0B1929] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        
        {/* Floating Moon Icon */}
        <div className="absolute top-20 right-20 animate-pulse">
          <Moon className="w-32 h-32 text-purple-400 opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
          {/* Logo/Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <Moon className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold text-purple-300">Dormir Agora</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">
                Durma Melhor
              </span>
              <span className="block text-white mt-2">Esta Noite</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Rotinas guiadas, respiração, sons relaxantes e diário do sono para você dormir mais rápido
            </p>
          </div>

          {/* Main Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 max-w-3xl mx-auto">
            {/* Ritual de Sono */}
            <Link
              href="/ritual"
              className="group relative bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-8 rounded-3xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ritual de Sono</h3>
                  <p className="text-gray-300 text-sm">Rotina guiada passo a passo</p>
                </div>
              </div>
            </Link>

            {/* Respiração Guiada */}
            <Link
              href="/respiracao"
              className="group relative bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-8 rounded-3xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <Wind className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Respiração Guiada</h3>
                  <p className="text-gray-300 text-sm">Técnica 4-7-8 para relaxar</p>
                </div>
              </div>
            </Link>

            {/* Sons Relaxantes */}
            <Link
              href="/sons"
              className="group relative bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center">
                  <Music className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sons Relaxantes</h3>
                  <p className="text-gray-300 text-sm">Chuva, mar, floresta e mais</p>
                </div>
              </div>
            </Link>

            {/* Diário do Sono */}
            <Link
              href="/diario"
              className="group relative bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 p-8 rounded-3xl border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
            >
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Diário do Sono</h3>
                  <p className="text-gray-300 text-sm">Registre e acompanhe seu sono</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-500/20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="text-sm">
            © 2024 Dormir Agora. Seu companheiro para noites tranquilas.
          </p>
        </div>
      </footer>
    </div>
  )
}
