export default function TopicTabs({ items, activeId, onChange }) {
  return (
    <div className="mb-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
      <div className="flex min-w-max flex-col gap-2 md:flex-row">
        {items.map((item) => {
          const Icon = item.icon
          const active = item.id === activeId

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
                className={[
                  'relative flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-300 md:text-sm',
                  active
                  ? 'bg-amber-500 font-bold text-black shadow-lg shadow-amber-500/10 scale-[1.01]'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-y-[-1px]',
                ].join(' ')}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
