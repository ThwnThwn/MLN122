import { ArrowLeft, ArrowRight } from 'lucide-react'
import TabStage from './TabStage'

function Card({ className = '', children }) {
  return (
    <div
      className={[
        'rounded-[20px] border border-[#e3d8c8] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_12px_32px_rgba(30,40,60,0.06)] backdrop-blur-sm md:p-8',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function SectionPill({ children }) {
  return (
    <span className="inline-flex rounded-full border border-[#ff9800]/20 bg-[#ff9800]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f59e0b]">
      {children}
    </span>
  )
}

function renderLines(value) {
  return String(value)
    .split('\n')
    .map((line, index) => (
      <p key={`${line}-${index}`} className="whitespace-pre-line">
        {line}
      </p>
    ))
}

function TheoryBlock({ block }) {
  if (block.type === 'pairCards') {
    return (
      <div className="grid gap-5 lg:grid-cols-2">
        {block.cards.map((card) => (
          <Card key={card.title}>
            <div className="mb-5 h-1.5 w-16 rounded-full bg-[#ff9800]" />
            <h3 className="text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
              {card.title}
            </h3>
            <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-[#5d6b82] md:text-[18px]">
              {card.body.map((para) => renderLines(para))}
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c8798]">
              {card.footer}
            </p>
          </Card>
        ))}
      </div>
    )
  }

  if (block.type === 'featureGrid') {
    return (
      <Card>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h3 className="max-w-3xl text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
            {block.title}
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.number}
              className="rounded-[18px] border border-[#e3d8c8] bg-white/70 p-5 shadow-[0_10px_24px_rgba(30,40,60,0.04)]"
            >
              <div className="mb-3 text-[12px] font-black tracking-[0.34em] text-[#ff9800]">
                {item.number}
              </div>
              <h4 className="text-[20px] font-bold leading-snug text-[#162033]">{item.title}</h4>
              <p className="mt-3 text-[16px] leading-[1.7] text-[#5d6b82]">{item.text}</p>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (block.type === 'stepCards') {
    return (
      <Card>
        <h3 className="max-w-4xl text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
          {block.title}
        </h3>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.number}
              className="rounded-[18px] border border-[#e3d8c8] bg-white/70 p-5 shadow-[0_10px_24px_rgba(30,40,60,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="text-[34px] font-black leading-none text-[#ff9800]">
                  {item.number}
                </div>
                <div className="rounded-full border border-[#ff9800]/20 bg-[#ff9800]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f59e0b]">
                  {item.kicker}
                </div>
              </div>
              <h4 className="mt-4 text-[20px] font-bold leading-snug text-[#162033]">
                {item.title}
              </h4>
              <p className="mt-3 text-[16px] leading-[1.7] text-[#5d6b82]">{item.text}</p>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (block.type === 'dualOutcome') {
    return (
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
          {block.kicker}
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {block.items.map((item) => (
            <div
              key={item.title}
              className="rounded-[18px] border border-[#e3d8c8] bg-white/75 p-6 shadow-[0_10px_24px_rgba(30,40,60,0.04)]"
            >
              <h4 className="text-[20px] font-bold leading-snug text-[#162033]">{item.title}</h4>
              <p className="mt-3 text-[16px] font-semibold leading-[1.65] text-[#f59e0b]">
                {item.intro}
              </p>
              <ul className="mt-4 space-y-2 text-[16px] leading-[1.7] text-[#5d6b82]">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff9800]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (block.type === 'conclusion') {
    return (
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
          {block.title}
        </p>
        <div className="mt-4 border-l-4 border-[#ff9800] pl-5">
          <p className="text-[18px] leading-[1.8] text-[#162033] md:text-[20px]">{block.text}</p>
          <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#f59e0b]">
            {block.note}
          </p>
        </div>
      </Card>
    )
  }

  if (block.type === 'lead') {
    return (
      <Card className="border-[#e3d8c8]/90 bg-white/65">
        <p className="text-[18px] leading-[1.8] text-[#162033] md:text-[19px]">
          {block.text}
        </p>
      </Card>
    )
  }

  if (block.type === 'stackCards') {
    return (
      <div className="grid gap-5">
        {block.items.map((item) => (
          <Card key={item.title}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
                  {item.kicker}
                </p>
                <h3 className="mt-2 text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
                  {item.title}
                </h3>
              </div>
              <p className="max-w-xl text-[16px] leading-[1.75] text-[#5d6b82] md:text-[18px]">
                {item.body}
              </p>
            </div>
            <div className="grid gap-3 rounded-[18px] border border-[#e3d8c8] bg-white/70 p-5">
              {Array.isArray(item.notes)
                ? item.notes.map((note) => (
                    <p
                      key={note}
                      className="whitespace-pre-line text-[16px] leading-[1.7] text-[#5d6b82]"
                    >
                      {note}
                    </p>
                  ))
                : null}
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7c8798]">
              {item.footer}
            </p>
          </Card>
        ))}
      </div>
    )
  }

  if (block.type === 'processSplit') {
    return (
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
          {block.kicker}
        </p>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
          {block.title}
        </h3>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-[18px] border border-[#e3d8c8] bg-white/75 p-6">
            <h4 className="text-[20px] font-bold text-[#162033]">{block.left.title}</h4>
            <div className="mt-4 space-y-3 text-[16px] leading-[1.8] text-[#5d6b82]">
              {block.left.text.map((para) => renderLines(para))}
            </div>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ff9800]/20 bg-[#ff9800]/10 text-[#f59e0b]">
              →
            </div>
          </div>
          <div className="rounded-[18px] border border-[#e3d8c8] bg-white/75 p-6">
            <h4 className="text-[20px] font-bold text-[#162033]">{block.right.title}</h4>
            <div className="mt-4 space-y-3 text-[16px] leading-[1.8] text-[#5d6b82]">
              {block.right.text.map((para) => renderLines(para))}
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (block.type === 'comparison') {
    return (
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
          {block.kicker}
        </p>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
          {block.title}
        </h3>
        <div className="mt-6 overflow-hidden rounded-[18px] border border-[#e3d8c8] bg-white/75">
          <div className="grid grid-cols-3 border-b border-[#e3d8c8] bg-[#f9f4ea] text-[11px] font-bold uppercase tracking-[0.28em] text-[#7c8798]">
            {block.columns.map((column) => (
              <div key={column} className="p-4">
                {column}
              </div>
            ))}
          </div>
          <div className="divide-y divide-[#e3d8c8]">
            {block.rows.map((row) => (
              <div key={row[0]} className="grid grid-cols-3">
                {row.map((cell, index) => (
                  <div
                    key={cell}
                    className={[
                      'p-4 text-[16px] leading-[1.7] text-[#5d6b82]',
                      index === 0 ? 'font-semibold text-[#162033]' : '',
                    ].join(' ')}
                  >
                    {renderLines(cell)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  if (block.type === 'summarySteps') {
    return (
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
          {block.kicker}
        </p>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
          {block.title}
        </h3>
        {block.subtitle ? (
          <p className="mt-3 text-[16px] font-semibold uppercase tracking-[0.22em] text-[#f59e0b]">
            {block.subtitle}
          </p>
        ) : null}
        {block.intro ? <p className="mt-3 text-[16px] leading-[1.8] text-[#5d6b82]">{block.intro}</p> : null}
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.step}
              className="rounded-[18px] border border-[#e3d8c8] bg-white/75 p-5 shadow-[0_10px_24px_rgba(30,40,60,0.04)]"
            >
              <p className="text-[12px] font-black tracking-[0.34em] text-[#ff9800]">{item.step}</p>
              {item.note ? (
                <p className="mt-2 text-[14px] font-semibold uppercase tracking-[0.2em] text-[#7c8798]">
                  {item.note}
                </p>
              ) : null}
              <p className="mt-3 text-[16px] leading-[1.8] text-[#5d6b82]">{item.text}</p>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (block.type === 'processSteps') {
    return (
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
          {block.kicker}
        </p>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
          {block.title}
        </h3>
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {block.items.map((item) => (
            <div
              key={item.number}
              className="rounded-[18px] border border-[#e3d8c8] bg-white/75 p-5 shadow-[0_10px_24px_rgba(30,40,60,0.04)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-[34px] font-black leading-none text-[#ff9800]">
                  {item.number}
                </div>
                {item.note ? (
                  <div className="rounded-full border border-[#ff9800]/20 bg-[#ff9800]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f59e0b]">
                    {item.note}
                  </div>
                ) : null}
              </div>
              <h4 className="mt-4 text-[20px] font-bold leading-snug text-[#162033]">
                {item.title}
              </h4>
              <p className="mt-3 text-[16px] leading-[1.75] text-[#5d6b82]">{item.text}</p>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (block.type === 'flow') {
    return (
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
          {block.kicker}
        </p>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
          {block.title}
        </h3>
        <div className="mt-6 grid gap-4 xl:grid-cols-5">
          {block.items.map((item) => (
            <div
              key={item.step}
              className="rounded-[18px] border border-[#e3d8c8] bg-white/75 p-5 text-center shadow-[0_10px_24px_rgba(30,40,60,0.04)]"
            >
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-[#ff9800]">
                {item.step}
              </p>
              <h4 className="mt-3 text-[18px] font-bold leading-snug text-[#162033]">
                {item.title}
              </h4>
              <p className="mt-3 text-[14px] leading-[1.7] text-[#5d6b82]">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-[18px] border border-[#e3d8c8] bg-[#f9f4ea] p-5">
          <p className="text-[16px] leading-[1.8] text-[#162033]">{block.quote}</p>
        </div>
      </Card>
    )
  }

  if (block.type === 'insightPair') {
    return (
      <Card>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7c8798]">
          {block.kicker}
        </p>
        <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#162033] md:text-[26px]">
          {block.title}
        </h3>
        <p className="mt-3 text-[16px] leading-[1.8] text-[#5d6b82]">{block.intro}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {block.items.map((item) => (
            <div
              key={item.number}
              className="rounded-[18px] border border-[#e3d8c8] bg-white/75 p-6 shadow-[0_10px_24px_rgba(30,40,60,0.04)]"
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#f59e0b]">
                {item.number}
              </p>
              <h4 className="mt-3 text-[20px] font-bold leading-snug text-[#162033]">
                {item.title}
              </h4>
              <p className="mt-3 text-[16px] leading-[1.8] text-[#5d6b82]">{item.text}</p>
              <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#7c8798]">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return null
}

export default function TheorySection({ section, activeId, direction, onNavigate, onSelect }) {
  const activeSection = section.find((item) => item.id === activeId)

  return (
    <section className="relative isolate min-h-[calc(100svh-170px)] overflow-visible rounded-[28px] border border-[#e3d8c8] bg-[#fbf8f2] shadow-[0_24px_80px_rgba(30,40,60,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.06),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.18))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(40,60,80,0.05)_1px,transparent_1px),linear-gradient(rgba(40,60,80,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40 pointer-events-none" />

      <div className="relative z-10 flex h-auto min-h-0 flex-col p-4 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <SectionPill>PHẦN I</SectionPill>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-[30px] font-bold tracking-tight text-[#162033] md:text-[48px]">
              Lý luận của V.I. Lênin
            </h2>
            <p className="mt-3 max-w-4xl text-[16px] leading-[1.8] text-[#5d6b82] md:text-[18px]">
              Học thuyết khoa học và biện chứng về sự chuyển dịch lịch sử từ cạnh tranh tự do lên
              chủ nghĩa tư bản độc quyền.
            </p>
          </div>
        </div>

        <div className="w-full rounded-[22px] border border-[#e3d8c8] bg-white p-2 shadow-sm">
          <div className="no-scrollbar flex w-full gap-2 overflow-x-auto lg:grid lg:grid-cols-[0.92fr_1.35fr_1.55fr_1.18fr] lg:gap-1.5 lg:overflow-visible">
            {section.map((item) => {
              const active = item.id === activeId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  className={[
                    'relative min-w-max whitespace-nowrap rounded-[16px] px-3 py-3 text-center text-[clamp(10px,0.5vw,11px)] font-semibold leading-[1.1] tracking-[-0.01em] transition-all duration-300 ease-out lg:min-w-0 lg:w-full lg:px-1.5 lg:py-3.5',
                    active
                      ? 'bg-[#fff1df] text-[#ff8a00] shadow-sm'
                      : 'text-[#66728a] hover:bg-[#fff7ed] hover:text-[#ff8a00]',
                  ].join(' ')}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#ff9800]" />
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-5 min-h-[480px]">
          <TabStage activeKey={activeId} direction={direction} className="h-auto">
            <div className="animate-tab-content grid gap-5">
              {activeSection?.blocks.map((block) => (
                <TheoryBlock
                  key={`${activeId}-${block.type}-${block.title || block.kicker || ''}`}
                  block={block}
                />
              ))}
            </div>
          </TabStage>

          <div className="mt-5 border-t border-[#e3d8c8] pt-4">
            <div className="flex items-center justify-between gap-3 text-xs">
              <button
                type="button"
                onClick={() => onNavigate('hero')}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold text-[#5d6b82] transition-colors hover:bg-white/70 hover:text-[#162033]"
              >
                <ArrowLeft className="h-4 w-4" />
                Về đầu
              </button>
              <div className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[#7c8798] md:block">
                MỤC 1
              </div>
              <button
                type="button"
                onClick={() => onNavigate(activeSection?.next || 'case-study')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff9800] px-3 py-2 font-bold text-white shadow-[0_10px_24px_rgba(245,158,11,0.16)] transition-colors hover:bg-[#f59e0b]"
              >
                {activeSection?.footer?.nextLabel || 'Tiếp tục phần II'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
