import { useEffect, useState } from 'react'
import { ArrowRight, Menu, Monitor, Smartphone, X } from 'lucide-react'
import Reveal from './Reveal'
import TabStage from './TabStage'
import { navItems, theoryData, monopolyFormsData, stateMonopolyData, bigTechData, practicalTabs, conclusionData, creativeProductData } from '../data/presentationDeck'
import SectionFooter from './SectionFooter'

const HERO_SLIDES = [
  '/hero/slides/1.png',
  '/hero/slides/2.png',
  '/hero/slides/3.png',
  '/hero/slides/4.png',
  '/hero/slides/5.png',
]

export function SectionWrapper({
  eyebrow,
  title,
  intro,
  children,
  footer,
  className = '',
}) {
  return (
    <section
      className={[
        'relative overflow-hidden rounded-[32px] border border-[#eadfce] bg-[linear-gradient(180deg,#fffdf9_0%,#f8f2e8_100%)] text-slate-900 shadow-[0_24px_70px_rgba(60,40,20,0.12)]',
        className,
      ].join(' ')}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,184,77,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,243,219,0.66),transparent_36%)] pointer-events-none" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <Reveal className="mb-8 md:mb-10">
          <span className="inline-flex rounded-full border border-[#ffb24a]/25 bg-[#fff2dd] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-[#d98700]">
            {eyebrow}
          </span>
          <h2 className="mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-3xl font-bold leading-[1.05] tracking-tight text-[#14213d] md:text-5xl">
            {title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-[1.8] text-[#5c6b83] md:text-base">
            {intro}
          </p>
        </Reveal>

        {children}

        {footer ? <SectionFooter footer={footer} onNavigate={footer.onNavigate} /> : null}
      </div>
    </section>
  )
}

function DarkCard({ children, className = '', delay = 0 }) {
  return (
    <Reveal delay={delay} className={className}>
      <div className="h-full rounded-[24px] border border-[#eadfce] bg-[rgba(255,255,255,0.92)] p-5 shadow-[0_16px_40px_rgba(60,40,20,0.08)] backdrop-blur-md md:p-6">
        {children}
      </div>
    </Reveal>
  )
}

export function HeroSection({ onStart, onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    HERO_SLIDES.forEach((src) => {
      const image = new Image()
      image.src = src
    })

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length)
    }, 6800)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hero-shell relative isolate h-[100dvh] w-full overflow-hidden bg-[#071018] text-white">
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide}
            className={[
              'hero-slide absolute inset-0 bg-cover bg-center bg-no-repeat',
              activeSlide === index ? 'hero-slide-active' : '',
            ].join(' ')}
            style={{ backgroundImage: `url('${slide}')` }}
          />
        ))}
      </div>
      <div className="hero-fog-warm absolute inset-[-18%] z-[1] pointer-events-none" />
      <div className="hero-fog-cold absolute inset-[-18%] z-[1] pointer-events-none" />
      <div className="hero-mid-fog absolute inset-[-10%] z-[2] pointer-events-none" />
      <div className="hero-dust absolute inset-0 z-[4] pointer-events-none" />
      <div className="hero-light-beam absolute inset-0 z-[5] pointer-events-none" />
      <div className="hero-grain absolute inset-0 z-[6] pointer-events-none" />
      <div className="hero-vignette absolute inset-0 z-[7] pointer-events-none" />

      <header className="absolute inset-x-4 top-5 z-40 md:inset-x-16">
        <div className="mx-auto rounded-[18px] border border-white/18 bg-[rgba(10,30,45,0.34)] px-4 shadow-[0_10px_32px_rgba(0,0,0,0.22)] backdrop-blur-[14px] md:px-5">
          <div className="flex h-[66px] w-full items-center justify-between gap-4 md:h-[70px]">
          <div className="flex items-center gap-3">
            <img
              src="/assets/FPT_Education_logo.svg"
              alt="FPT Education Logo"
              className="h-8 w-auto shrink-0"
            />
            <div className="hidden border-l border-white/15 pl-3 leading-tight sm:block">
              <p className="text-[12px] text-white/74">Kinh tế chính trị Mác - Lênin</p>
            </div>
          </div>

          <nav className="hidden h-full items-center gap-1 whitespace-nowrap text-xs md:flex md:gap-2 md:text-sm">
            {navItems.slice(0, 1).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMobileNavOpen(false)
                  onNavigate?.(item.id)
                }}
                className="relative whitespace-nowrap rounded-[10px] px-3 py-2 text-amber-300 transition-all duration-300 md:px-4"
              >
                {item.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-amber-300" />
              </button>
            ))}
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMobileNavOpen(false)
                  onNavigate?.(item.id)
                }}
                className="relative whitespace-nowrap rounded-[10px] px-3 py-2 text-white/72 transition-all duration-300 hover:text-white md:px-4"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileNavOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-white/16 bg-white/8 text-white transition-colors hover:bg-white/12 md:hidden"
            aria-label={mobileNavOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          </div>

          {mobileNavOpen ? (
            <div className="border-t border-white/12 py-3 md:hidden">
              <nav className="grid gap-2">
                {navItems.map((item) => {
                  const active = item.id === 'hero'
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setMobileNavOpen(false)
                        onNavigate?.(item.id)
                      }}
                      className={[
                        'rounded-[12px] px-4 py-3 text-left text-sm font-medium transition-all duration-300',
                        active
                          ? 'bg-amber-300/14 text-amber-300'
                          : 'bg-white/6 text-white/82 hover:bg-white/10 hover:text-white',
                      ].join(' ')}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </div>
          ) : null}
        </div>
      </header>

      <div className="relative z-20 flex h-[100dvh] w-full flex-col px-4 pb-8 pt-28 md:px-0 md:pb-10 md:pt-28">
        <div className="flex flex-1 items-center">
          <div className="max-w-[1120px] pl-1 md:ml-[84px] md:pl-0 xl:ml-[108px]">
            <Reveal>
              <h1 className="max-w-5xl font-[family-name:var(--font-heading)] text-[44px] font-extrabold leading-[1.02] tracking-tight text-white sm:text-[58px] md:text-[78px] xl:text-[96px]">
                <span className="block">
                  Từ cạnh tranh <span className="text-amber-300">tự do</span>
                </span>
                <span className="block">
                  đến <span className="text-amber-300">độc quyền</span>
                </span>
              </h1>
              <p className="mt-6 max-w-[1320px] text-[18px] leading-[1.55] text-white/88 sm:text-[20px] md:text-[22px]">
                Biểu hiện mới của độc quyền và độc quyền nhà nước trong điều kiện hiện nay.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onStart}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300"
                >
                  Bắt đầu
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('creative-product')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12"
                >
                  Xem Sản phẩm sáng tạo
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export function TheoryCard({ card, expanded, onToggle }) {
  return (
    <DarkCard>
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300/90">
              Cơ sở lý luận
            </p>
            <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#14213d]">{card.title}</h3>
          </div>
          <div className="rounded-full border border-[#ffb24a]/25 bg-[#fff3df] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.26em] text-[#d98700]">
            {card.id.split('-').pop()}
          </div>
        </div>
        <p className="text-[15px] leading-[1.8] text-[#526179]">{card.lead}</p>
        <ul className="mt-4 space-y-3">
          {card.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-[1.7] text-[#5c6b83]">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-300" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onToggle(card.id)}
          className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-[#eadfce] bg-[#fff8ef] px-4 py-2 text-xs font-semibold text-[#46556d] transition-colors hover:bg-[#fff1df]"
        >
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
        {expanded ? (
          <div className="mt-4 rounded-[18px] border border-[#b9d8ef] bg-[#eef7fd] p-4 text-sm leading-[1.8] text-[#526179]">
            {card.more}
          </div>
        ) : null}
      </div>
    </DarkCard>
  )
}

export function TimelineStep({ step, index }) {
  return (
    <DarkCard delay={index * 60}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300/90">
              {step.kicker || `Mục ${index + 1}`}
            </p>
            <h3 className="mt-3 text-[21px] font-bold leading-tight text-[#14213d]">{step.title}</h3>
          </div>
          {step.badge ? (
            <div className="rounded-full border border-[#eadfce] bg-[#fffaf3] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-[#7b8797]">
              {step.badge}
            </div>
          ) : null}
        </div>
        <p className="mt-4 text-[15px] leading-[1.8] text-[#526179]">{step.text}</p>
      </div>
    </DarkCard>
  )
}

export function FeatureCard({ feature }) {
  const Icon = feature.icon
  return (
    <DarkCard>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 text-amber-300">
            <Icon className="h-5 w-5" />
          </div>
          {feature.tag ? (
            <div className="rounded-full border border-[#eadfce] bg-[#fffaf3] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.26em] text-[#7b8797]">
              {feature.tag}
            </div>
          ) : null}
        </div>
        <h3 className="mt-5 text-[22px] font-bold leading-tight text-[#14213d]">{feature.title}</h3>
        <p className="mt-3 text-[15px] leading-[1.8] text-[#526179]">{feature.summary}</p>
        <ul className="mt-4 space-y-3">
          {feature.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-sm leading-[1.7] text-[#5c6b83]">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </DarkCard>
  )
}

export function BigTechCard({ item }) {
  return (
    <DarkCard>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c98a2e]">
              Big Tech AI
            </p>
            <h3 className="mt-3 text-[22px] font-bold leading-tight text-[#14213d]">{item.title}</h3>
          </div>
          <div className="rounded-full border border-[#E6D8C7] bg-[#EAF0F4] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.26em] text-[#5C6B7A]">
            {item.tag}
          </div>
        </div>
        <p className="mt-4 text-[15px] leading-[1.8] text-[#526179]">
          <span className="font-semibold text-[#14213d]">Hệ sinh thái:</span> {item.ecosystem}
        </p>
        <p className="mt-3 text-[15px] leading-[1.8] text-[#526179]">
          <span className="font-semibold text-[#14213d]">Lợi thế:</span> {item.advantage}
        </p>
        <div className="mt-4 rounded-[18px] border border-[#E6D8C7] bg-[#FFF4E2] p-4 text-sm leading-[1.8] text-[#5F6C7B]">
          <span className="font-semibold text-[#d98700]">Liên hệ độc quyền:</span> {item.monopolyLink}
        </div>
      </div>
    </DarkCard>
  )
}

export function TheorySection({ onNavigate }) {
  const [expandedId, setExpandedId] = useState(theoryData[0].id)

  return (
    <SectionWrapper
      eyebrow="Phần II"
      title="Cơ sở lý luận"
      intro="Phần này rút gọn các luận điểm nền tảng để dễ trình bày: vì sao độc quyền hình thành, nhà nước tham gia thế nào và giá trị lý luận của Lênin nằm ở đâu."
      footer={{ back: 'hero', backLabel: 'Quay lại Mở đầu', next: 'monopoly-forms', nextLabel: 'Tiếp tục Biểu hiện mới', onNavigate }}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {theoryData.map((card, index) => (
          <TheoryCard
            key={card.id}
            card={card}
            expanded={expandedId === card.id}
            onToggle={(id) => setExpandedId((current) => (current === id ? '' : id))}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}

export function MonopolyFormsSection({ onNavigate }) {
  return (
    <SectionWrapper
      eyebrow="Phần III"
      title="Biểu hiện mới của độc quyền"
      intro="Trong kinh tế số, độc quyền không chỉ là kiểm soát hàng hóa mà còn là kiểm soát nền tảng, dữ liệu, công nghệ lõi và cổng vào thị trường."
      footer={{ back: 'theory', backLabel: 'Quay lại Cơ sở lý luận', next: 'state-monopoly', nextLabel: 'Tiếp tục Độc quyền nhà nước', onNavigate }}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {monopolyFormsData.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
      <div className="mt-6 rounded-[24px] border border-[#b9d8ef] bg-[#eef7fd] p-5 text-sm leading-[1.8] text-[#526179] md:p-6">
        <span className="font-semibold text-[#4287b5]">Highlight:</span> Độc quyền hiện đại bám vào
        nền tảng số, dữ liệu lớn, công nghệ lõi và khả năng khóa người dùng trong hệ sinh thái.
      </div>
    </SectionWrapper>
  )
}

export function StateMonopolySection({ onNavigate }) {
  return (
    <SectionWrapper
      eyebrow="Phần IV"
      title="Độc quyền nhà nước"
      intro="Nhà nước hiện đại không đứng ngoài thị trường. Nó can thiệp qua ngân sách, đầu tư công, điều tiết và quan hệ sở hữu để giữ ổn định hệ thống kinh tế."
      footer={{ back: 'monopoly-forms', backLabel: 'Quay lại Biểu hiện mới', next: 'practical', nextLabel: 'Tiếp tục Liên hệ thực tiễn', onNavigate }}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {stateMonopolyData.map((block, index) => {
          const Icon = block.icon
          return (
            <DarkCard key={block.title} delay={index * 60}>
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="mt-5 text-[22px] font-bold leading-tight text-[#14213d]">{block.title}</h3>
                <ul className="mt-4 space-y-3">
                  {block.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-[1.7] text-[#526179]">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </DarkCard>
          )
        })}
      </div>
      <div className="mt-6 grid gap-4 rounded-[24px] border border-[#eadfce] bg-[rgba(255,255,255,0.88)] p-5 md:grid-cols-[1fr_1.2fr] md:p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300/90">
            Ý nghĩa
          </p>
          <h3 className="mt-3 text-[22px] font-bold text-[#14213d]">Nhà nước là công cụ điều tiết</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {['Ngân sách', 'Đầu tư công', 'Hỗ trợ doanh nghiệp', 'Điều tiết thị trường', 'Giải cứu khủng hoảng', 'An sinh, y tế, giáo dục'].map((item) => (
            <div key={item} className="rounded-full border border-[#eadfce] bg-[#fffaf3] px-4 py-3 text-center text-sm font-medium text-[#526179]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

export function PracticalSection({ onNavigate }) {
  const [activeTab, setActiveTab] = useState(practicalTabs[0].id)
  const active = practicalTabs.find((item) => item.id === activeTab) || practicalTabs[0]

  return (
    <SectionWrapper
      eyebrow="Phần V"
      title="Liên hệ thực tiễn"
      intro="Big Tech AI cho thấy độc quyền hiện đại vận hành qua dữ liệu, cloud, nền tảng và liên kết chiến lược thay vì chỉ qua hàng hóa hữu hình."
      footer={{ back: 'state-monopoly', backLabel: 'Quay lại Độc quyền nhà nước', next: 'conclusion', nextLabel: 'Tiếp tục Kết luận', onNavigate }}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {bigTechData.map((item) => (
          <BigTechCard key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-6 rounded-[26px] border border-[#eadfce] bg-[rgba(255,255,255,0.88)] p-3 backdrop-blur-md">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {practicalTabs.map((tab) => {
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'whitespace-nowrap rounded-[16px] px-4 py-3 text-sm font-semibold transition-all duration-300',
                  isActive
                    ? 'bg-[#F4B63D] text-[#3D2B12] shadow-[0_10px_22px_rgba(216,154,43,0.18)]'
                    : 'bg-[#F6F1E8] text-[#6F6B63] hover:bg-[#EFE7DA] hover:text-[#1F2A44]',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <TabStage activeKey={active.id} className="mt-4">
        <DarkCard>
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#c98a2e]">
                Góc nhìn Mác - Lênin
              </p>
              <h3 className="mt-3 text-[24px] font-bold leading-tight text-[#14213d]">{active.title}</h3>
            </div>
            <ul className="space-y-3">
              {active.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm leading-[1.8] text-[#526179]">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D89A2B]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </DarkCard>
      </TabStage>
    </SectionWrapper>
  )
}

export function ConclusionSection({ onNavigate }) {
  return (
    <SectionWrapper
      eyebrow="Phần VI"
      title="Kết luận"
      intro="Kết luận của bài trình bày là: độc quyền là kết quả của cạnh tranh, tích tụ và tập trung tư bản; trong điều kiện mới, nó chuyển sang nền tảng số, dữ liệu lớn, công nghệ lõi và hệ sinh thái Big Tech."
      footer={{ back: 'practical', backLabel: 'Quay lại Liên hệ thực tiễn', next: 'creative-product', nextLabel: 'Xem Sản phẩm sáng tạo', onNavigate }}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {conclusionData.map((item, index) => (
          <DarkCard key={item.title} delay={index * 60}>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-amber-300" />
                <h3 className="text-[22px] font-bold text-[#14213d]">{item.title}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-[1.9] text-[#526179]">{item.body}</p>
            </div>
          </DarkCard>
        ))}
      </div>

      <div className="mt-6 rounded-[26px] border border-[#ffcf8a] bg-[#fff4e4] p-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d98700]">
          Chốt bài
        </p>
        <p className="mt-3 text-[18px] font-semibold leading-[1.8] text-[#14213d] md:text-[20px]">
          The Last Shop giúp chuyển hóa lý luận kinh tế chính trị thành trải nghiệm trực quan.
        </p>
      </div>
    </SectionWrapper>
  )
}

export function GameShowcase({ onNavigate, onPlay }) {
  const [downloadMessage, setDownloadMessage] = useState(null)

  const handleUnavailableDownload = (message) => {
    setDownloadMessage(message)
    window.clearTimeout(handleUnavailableDownload.timer)
    handleUnavailableDownload.timer = window.setTimeout(() => {
      setDownloadMessage(null)
    }, 2500)
  }

  return (
    <SectionWrapper
      eyebrow={creativeProductData.eyebrow}
      title={creativeProductData.title}
      intro={creativeProductData.subtitle}
      footer={{ back: 'conclusion', backLabel: 'Quay lại Kết luận & Q&A', onNavigate }}
    >
      <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <DarkCard>
          <div className="flex h-full flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300/90">
              {creativeProductData.eyebrow}
            </p>
            <p className="max-w-2xl text-base leading-[1.85] text-[#526179] md:text-[17px]">
              {creativeProductData.description}
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {creativeProductData.cards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.title}
                    className="rounded-[20px] border border-[#eadfce] bg-[#fffaf3] p-4 shadow-[0_10px_24px_rgba(60,40,20,0.06)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 text-amber-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-4 text-[17px] font-bold leading-tight text-[#14213d]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[#5c6b83]">{card.body}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              {creativeProductData.downloads.map((item) => {
                const DownloadIcon = item.id === 'android' ? Smartphone : Monitor
                const className =
                  'inline-flex items-center gap-2 rounded-[16px] border border-[#eadfce] bg-[#fff8ef] px-5 py-3 font-bold text-[#14213d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff1df]'

                if (item.enabled) {
                  return (
                    <a key={item.id} href={item.href} download className={className}>
                      <DownloadIcon className="h-5 w-5 text-[#d98700]" />
                      {item.label}
                    </a>
                  )
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleUnavailableDownload(item.message)}
                    className={className}
                  >
                    <DownloadIcon className="h-5 w-5 text-[#d98700]" />
                    {item.label}
                  </button>
                )
              })}
            </div>

            {downloadMessage ? (
              <div className="rounded-[16px] border border-[#ffcf8a] bg-[#fff4e4] px-4 py-3 text-sm font-semibold text-[#b96d00] shadow-sm">
                {downloadMessage}
              </div>
            ) : null}
          </div>
        </DarkCard>

        <DarkCard>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#4287b5]">
              Preview
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[22px] border border-[#eadfce] bg-[#f7f0e8]">
            <img
              src={creativeProductData.previewImage}
              alt="The Last Shop preview"
              className="h-[260px] w-full object-cover object-center sm:h-[290px] lg:h-[320px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.06)_55%,rgba(0,0,0,0.24)_100%)]" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onPlay}
              className="inline-flex items-center gap-2 rounded-[16px] bg-amber-400 px-4 py-3 text-[14px] font-bold text-slate-950 transition-colors hover:bg-amber-300"
            >
              Chơi Game
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </DarkCard>
      </div>
    </SectionWrapper>
  )
}
