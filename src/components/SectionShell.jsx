import Reveal from './Reveal'

export default function SectionShell({
  eyebrow,
  title,
  intro,
  children,
  className = '',
  ...props
}) {
  return (
    <section
      {...props}
      className={`light-section relative flex min-h-[100svh] snap-start items-center border-t border-slate-200/80 py-20 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,156,0,0.10),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(249,156,0,0.06),_transparent_34%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-16">
        <Reveal className="mb-10 md:mb-12">
          <span className="inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-500">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-light tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            {intro}
          </p>
        </Reveal>

        {children}
      </div>
    </section>
  )
}
