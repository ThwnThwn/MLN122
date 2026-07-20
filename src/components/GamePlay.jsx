import { useEffect, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

const UNITY_BUILD_URL = '/TheLastShop/index.html'

function GamePlayPage() {
  const [buildReady, setBuildReady] = useState(null)

  useEffect(() => {
    let alive = true

    const checkBuild = async () => {
      try {
        const response = await fetch(UNITY_BUILD_URL, { method: 'HEAD' })
        if (!alive) return
        setBuildReady(response.ok)
      } catch {
        if (!alive) return
        setBuildReady(false)
      }
    }

    void checkBuild()

    return () => {
      alive = false
    }
  }, [])

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    window.location.href = '/?section=creative-product'
  }

  const renderLoading = () => (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,176,0,0.14),transparent_28%),linear-gradient(180deg,#071018_0%,#0b1320_100%)] px-6 text-center text-white">
      <div className="max-w-2xl rounded-[28px] border border-white/12 bg-white/7 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-10 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-white/60">
          The Last Shop
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[28px] font-bold leading-[1.08] text-white sm:text-[36px]">
          Đang kiểm tra bản build Unity...
        </h1>
        <p className="mt-4 text-sm leading-[1.7] text-white/72 sm:text-base">
          Nếu build tồn tại, game sẽ được tải trong vài giây.
        </p>
      </div>
    </div>
  )

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <button
        type="button"
        onClick={handleBack}
        className="absolute left-5 top-5 z-50 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg backdrop-blur hover:bg-white"
      >
        <span className="inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Quay lại bài thuyết trình
        </span>
      </button>

      {buildReady === null ? renderLoading() : buildReady === false ? (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,176,0,0.12),transparent_30%),linear-gradient(180deg,#02040a_0%,#050a12_100%)] px-6 text-center text-white">
          <div className="max-w-2xl rounded-[28px] border border-white/12 bg-white/6 px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-md sm:px-10 sm:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-white/60">
              Unity WebGL
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[28px] font-bold leading-[1.08] text-white sm:text-[36px]">
              Chưa tìm thấy bản build Unity tại public/TheLastShop. Vui lòng kiểm tra folder build.
            </h1>
            <p className="mt-4 text-sm leading-[1.7] text-white/72 sm:text-base">
              Cần có `index.html`, `Build/`, và `TemplateData/` trong `public/TheLastShop`.
            </p>
          </div>
        </div>
      ) : (
        <iframe
          src={UNITY_BUILD_URL}
          title="The Last Shop"
          className="h-full w-full border-0"
          allowFullScreen
        />
      )}
    </main>
  )
}

export default GamePlayPage
