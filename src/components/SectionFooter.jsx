import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function SectionFooter({ footer, onNavigate }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-3 rounded-[22px] border border-[#eadfce] bg-[rgba(255,255,255,0.88)] p-3 backdrop-blur-md">
      <button
        type="button"
        onClick={() => footer.back && onNavigate(footer.back)}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#5c6b83] transition-all hover:bg-[#fff1df] hover:text-[#14213d] disabled:cursor-not-allowed disabled:opacity-35"
        disabled={!footer.back}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{footer.backLabel || 'Quay lại'}</span>
      </button>

      {footer.next ? (
        <>
          <div className="hidden sm:block font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#d98700]">
            {footer.nextLabel}
          </div>

          <button
            type="button"
            onClick={() => onNavigate(footer.next)}
            className="flex items-center gap-1.5 rounded-xl bg-amber-400 px-3 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-amber-400/12 transition-all hover:bg-amber-300"
          >
            <span>{footer.nextLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </>
      ) : null}
    </div>
  )
}
