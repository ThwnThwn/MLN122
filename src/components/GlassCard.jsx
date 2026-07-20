import Reveal from './Reveal'

export default function GlassCard({ children, className = '', delay = 0 }) {
  return (
    <Reveal delay={delay} className={className}>
      <div className="liquid-glass h-full rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-black/5 transition-all duration-300 hover:border-amber-500/25">
        {children}
      </div>
    </Reveal>
  )
}
