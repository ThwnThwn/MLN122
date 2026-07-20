import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems } from './data/presentationDeck'
import {
  GameShowcase,
  HeroSection,
  MonopolyFormsSection,
  PracticalSection,
  StateMonopolySection,
  TheorySection,
} from './components/PresentationDeck'
import QASection from './components/QASection'
import GamePlay from './components/GamePlay'

const GAME_PLAY_PATH = '/game-play'
const mainSectionIds = new Set(navItems.map((item) => item.id))
const sectionAliases = {
  game: 'creative-product',
  boardgame: 'creative-product',
  analysis: 'practical',
  'case-study': 'practical',
  conclusion: 'closing',
}

function readLocationState() {
  if (typeof window === 'undefined') {
    return { route: 'main', section: 'hero' }
  }

  const { pathname, search } = window.location
  if (pathname === '/boardgame-play' || pathname === GAME_PLAY_PATH) {
    return { route: 'game-play', section: 'creative-product' }
  }

  const section = new URLSearchParams(search).get('section')
  const normalizedSection = sectionAliases[section] || section

  return {
    route: 'main',
    section: mainSectionIds.has(normalizedSection) ? normalizedSection : 'hero',
  }
}

function App() {
  const initialLocation = readLocationState()
  const [route, setRoute] = useState(initialLocation.route)
  const [activeSection, setActiveSection] = useState(initialLocation.section)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const isHero = route === 'main' && activeSection === 'hero'

  useEffect(() => {
    const handlePopState = () => {
      const nextLocation = readLocationState()
      setRoute(nextLocation.route)
      setActiveSection(nextLocation.section)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const { body, documentElement } = document
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = documentElement.style.overflow
    const previousBodyOverscroll = body.style.overscrollBehavior
    const previousHtmlOverscroll = documentElement.style.overscrollBehavior

    if (isHero) {
      body.style.overflow = 'hidden'
      documentElement.style.overflow = 'hidden'
      body.style.overscrollBehavior = 'none'
      documentElement.style.overscrollBehavior = 'none'
    } else {
      body.style.overflow = ''
      documentElement.style.overflow = ''
      body.style.overscrollBehavior = ''
      documentElement.style.overscrollBehavior = ''
    }

    return () => {
      body.style.overflow = previousBodyOverflow
      documentElement.style.overflow = previousHtmlOverflow
      body.style.overscrollBehavior = previousBodyOverscroll
      documentElement.style.overscrollBehavior = previousHtmlOverscroll
    }
  }, [isHero])

  const goSection = (id) => {
    const nextSection = sectionAliases[id] || id
    setRoute('main')
    setActiveSection(nextSection)
    setMobileNavOpen(false)

    if (typeof window !== 'undefined') {
      const nextUrl = nextSection === 'hero' ? '/' : `/?section=${nextSection}`
      window.history.pushState({ route: 'main', section: nextSection }, '', nextUrl)
    }
  }

  const goGamePlay = () => {
    setRoute('game-play')

    if (typeof window !== 'undefined') {
      window.history.pushState({ route: 'game-play' }, '', GAME_PLAY_PATH)
    }
  }

  const screen = {
    hero: <HeroSection onStart={() => goSection('theory')} onNavigate={goSection} />,
    theory: <TheorySection onNavigate={goSection} />,
    'monopoly-forms': <MonopolyFormsSection onNavigate={goSection} />,
    'state-monopoly': <StateMonopolySection onNavigate={goSection} />,
    practical: <PracticalSection onNavigate={goSection} />,
    closing: <QASection onNavigate={goSection} />,
    'creative-product': <GameShowcase onNavigate={goSection} onPlay={goGamePlay} />,
  }[activeSection]

  if (route === 'game-play') {
    return <GamePlay />
  }

  const header = !isHero ? (
    <header className="fixed inset-x-4 top-5 z-50 md:inset-x-16">
      <div
        className={[
          'mx-auto w-full rounded-[18px] px-4 backdrop-blur-[14px] md:px-5',
          'border border-[#eadfce] bg-[rgba(255,252,247,0.82)] shadow-[0_14px_36px_rgba(60,40,20,0.10)]',
        ].join(' ')}
      >
        <div className="flex h-[66px] items-center justify-between gap-4 md:h-[70px]">
          <div className="flex items-center gap-3">
            <img
              src="/assets/FPT_Education_logo.svg"
              alt="FPT Education Logo"
              className="h-8 w-auto shrink-0"
            />
            <div className="hidden border-l border-[#eadfce] pl-3 leading-tight sm:block">
              <p className="text-[12px] text-[#5c6b83]">Kinh tế chính trị Mác - Lênin</p>
            </div>
          </div>

          <nav className="hidden h-full items-center gap-1 whitespace-nowrap text-xs md:flex md:gap-2 md:text-sm">
            {navItems.map((item) => {
              const active = activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goSection(item.id)}
                  className={[
                    'relative whitespace-nowrap rounded-[10px] px-3 py-2 transition-all duration-300 md:px-4',
                    active ? 'text-[#d98700]' : 'text-[#5c6b83] hover:text-[#14213d]',
                  ].join(' ')}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#d98700]" />
                  ) : null}
                </button>
              )
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMobileNavOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#eadfce] bg-white/70 text-[#46556d] transition-colors hover:bg-white md:hidden"
            aria-label={mobileNavOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileNavOpen ? (
          <div className="border-t border-[#eadfce] py-3 md:hidden">
            <nav className="grid gap-2">
              {navItems.map((item) => {
                const active = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goSection(item.id)}
                    className={[
                      'rounded-[12px] px-4 py-3 text-left text-sm font-medium transition-all duration-300',
                      active
                        ? 'bg-[#fff2dd] text-[#d98700]'
                        : 'bg-white/72 text-[#5c6b83] hover:bg-white hover:text-[#14213d]',
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
  ) : null

  return (
    <div className={isHero ? 'h-[100dvh] overflow-hidden overscroll-none bg-[#05070a] text-slate-900' : 'min-h-[100svh] overflow-x-hidden bg-[linear-gradient(180deg,#fffdf9_0%,#f5eee3_100%)] text-slate-900'}>
      {header}
      <main className={isHero ? 'h-[100dvh] w-full overflow-hidden overscroll-none' : 'px-4 pb-8 pt-[118px] md:px-8 md:pt-[132px]'}>
        {isHero ? (
          screen
        ) : (
          <div className="mx-auto w-full max-w-7xl">
            {screen}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
