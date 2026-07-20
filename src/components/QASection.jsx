import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, ChevronDown, Loader2, Send, Trash2 } from 'lucide-react'
import { conclusionData } from '../data/presentationDeck'
import { qaQuickQuestions, qaWelcomeMessage } from '../data/qaContent'
import { getAvailableModels } from '../lib/chatService'

const AVAILABLE_MODELS = getAvailableModels()
const MODEL_STORAGE_KEY = 'qa_ai_model'

const STORAGE_KEY = 'qa_ai_session'
const API_ERROR_MESSAGE =
  'Chưa cấu hình khóa API. Vui lòng kiểm tra biến môi trường.'

function createId(prefix = 'msg') {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function createInitialMessages() {
  return [
    {
      id: createId('assistant'),
      role: 'assistant',
      text: qaWelcomeMessage,
    },
  ]
}

function summarizeConversation(messages) {
  const userLines = messages
    .filter((message) => message.role === 'user')
    .slice(-4)
    .map((message) => message.text.trim())
    .filter(Boolean)

  if (!userLines.length) {
    return ''
  }

  return userLines.join(' | ').slice(0, 420)
}

function readSession() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null

    return {
      sessionId: typeof parsed.sessionId === 'string' ? parsed.sessionId : createId('session'),
      summary: typeof parsed.summary === 'string' ? parsed.summary : '',
      messages: Array.isArray(parsed.messages) && parsed.messages.length
        ? parsed.messages
            .filter((message) => message && typeof message.text === 'string')
            .map((message) => ({
              id: typeof message.id === 'string' ? message.id : createId('msg'),
              role: message.role === 'user' ? 'user' : 'assistant',
              text: message.text,
              isError: Boolean(message.isError),
            }))
        : createInitialMessages(),
    }
  } catch {
    return null
  }
}

function saveSession(session) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } catch {
    // ignore storage failures
  }
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[88%] rounded-[18px] border px-4 py-3 shadow-sm md:max-w-[78%]',
          isUser
            ? 'border-[#f59e0b]/30 bg-[#ff9800] text-white'
            : message.isError
              ? 'border-rose-200 bg-rose-50 text-rose-700'
              : 'border-[#dde5ef] bg-[#fbf8f2] text-[#14213d]',
        ].join(' ')}
      >
        <div
          className={[
            'mb-2 text-[10px] font-bold uppercase tracking-[0.24em]',
            isUser ? 'text-white/75' : message.isError ? 'text-rose-500' : 'text-[#7c8798]',
          ].join(' ')}
        >
          {isUser ? 'Bạn' : 'AI'}
        </div>
        <p className="whitespace-pre-wrap text-[14px] leading-[1.6] md:text-[15px]">
          {message.text}
        </p>
      </div>
    </div>
  )
}

export default function QASection() {
  const [sessionId, setSessionId] = useState(() => createId('session'))
  const [messages, setMessages] = useState(() => createInitialMessages())
  const [summary, setSummary] = useState('')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const [selectedModel, setSelectedModel] = useState(() => {
    try {
      return window.localStorage.getItem(MODEL_STORAGE_KEY) || AVAILABLE_MODELS[0]?.id || 'gemini-3.1-flash-lite'
    } catch {
      return 'gpt-4o-mini'
    }
  })
  const scrollRef = useRef(null)
  const composerRef = useRef(null)
  const messagesRef = useRef(messages)

  useEffect(() => {
    const session = readSession()
    if (session) {
      setSessionId(session.sessionId)
      setSummary(session.summary)
      setMessages(session.messages)
      messagesRef.current = session.messages
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return
    }

    saveSession({
      sessionId,
      summary,
      messages,
    })
  }, [hydrated, sessionId, summary, messages])

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages, loading])

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading])

  const sendMessage = async (rawText) => {
    const text = rawText.trim()
    if (!text || loading) return

    const userMessage = {
      id: createId('user'),
      role: 'user',
      text,
    }

    const nextMessages = [...messagesRef.current, userMessage]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    const recentMessages = nextMessages.slice(-8).map((message) => ({
      role: message.role,
      content: message.text,
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          currentMessage: text,
          recentMessages,
          summary,
          model: selectedModel,
        }),
      })

      const payload = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.error || payload.message || API_ERROR_MESSAGE)
      }

      const assistantText = payload.reply || payload.answer || payload.message
      setSessionId(payload.sessionId || sessionId)
      setSummary(payload.summary || summarizeConversation(nextMessages))
      setMessages([
        ...nextMessages,
        {
          id: createId('assistant'),
          role: 'assistant',
          text: assistantText || 'Mình chưa có phản hồi phù hợp ngay lúc này.',
        },
      ])
    } catch (error) {
      setSummary(summarizeConversation(nextMessages))
      setMessages([
        ...nextMessages,
        {
          id: createId('assistant'),
          role: 'assistant',
          text: error instanceof Error ? error.message : API_ERROR_MESSAGE,
          isError: true,
        },
      ])
    } finally {
      setLoading(false)
      requestAnimationFrame(() => composerRef.current?.focus())
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    void sendMessage(input)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void sendMessage(input)
    }
  }

  const handleQuickQuestion = (question) => {
    void sendMessage(question)
  }

  const clearChat = () => {
    const nextMessages = createInitialMessages()
    const nextSession = createId('session')
    setSessionId(nextSession)
    setMessages(nextMessages)
    setSummary('')
    setInput('')
    setLoading(false)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <section className="relative w-full overflow-visible rounded-[28px] border border-slate-200 bg-[#fbf8f1] p-3 shadow-2xl shadow-black/5 md:p-4">
      <div className="grid grid-cols-1 items-start gap-4 overflow-visible lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:gap-8">
        <main className="h-auto min-h-fit overflow-visible">
          <div className="h-auto overflow-visible rounded-[20px] border border-[#e3d8c8] bg-[rgba(255,255,255,0.82)] px-4 py-5 shadow-[0_12px_28px_rgba(20,30,50,0.05)] md:px-[22px] md:py-[26px] lg:pr-[24px]">
            <span className="inline-flex rounded-full border border-[#ff9800]/20 bg-[#ff9800]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#f59e0b]">
              Kết luận
            </span>
            <h2 className="mt-4 max-w-[12ch] font-[family-name:var(--font-heading)] text-[28px] font-black leading-[0.98] tracking-[-0.03em] text-slate-900 sm:text-[30px] md:text-[34px] lg:text-[36px] xl:text-[38px]">
              <span className="block">KẾT LUẬN</span>
              <span className="mt-2 block">VÀ Q&A</span>
            </h2>
            <p className="mt-4 text-[15px] font-bold text-[#f59e0b] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[18px]">
              Kết luận trọng tâm và hỏi đáp ngay trong cùng một màn
            </p>
            <p className="mt-4 max-w-[30rem] text-[13px] leading-[1.72] text-[#526179] sm:text-[14px] md:text-[14px] lg:text-[15px] xl:text-[15px]">
              Bên trái là phần chốt ý của bài trình bày. Bên phải là trợ lý học thuật để hỏi tiếp,
              so sánh khái niệm và phản biện các ý liên quan đến chủ đề.
            </p>

            <div className="mt-5 flex-1 rounded-[18px] border border-[#dde5ef] bg-white/80 p-[22px] shadow-[0_10px_22px_rgba(20,30,50,0.045)]">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.32em] text-[#7c8798]">
                Tóm tắt kết luận
              </p>
              <div className="space-y-2.5">
                {conclusionData.map((item, index) => (
                  <div
                    key={item.title}
                    className={[
                      'flex gap-3',
                      index > 0 ? 'border-t border-[rgba(180,160,130,0.35)] pt-3' : '',
                    ].join(' ')}
                  >
                    <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#ff9800]" />
                    <div>
                      <h3 className="text-[15px] font-bold text-[#14213d] sm:text-[15px] md:text-[17px] lg:text-[18px]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-[28rem] text-[12px] leading-[1.58] text-[#526179] sm:text-[12px] md:text-[13px] lg:text-[14px]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <aside className="min-h-0 overflow-visible lg:sticky lg:top-[110px]">
          <div className="grid h-auto min-h-0 overflow-hidden rounded-[28px] border border-[#dde5ef] bg-[rgba(255,255,255,0.82)] shadow-[0_18px_48px_rgba(20,30,50,0.08)] backdrop-blur-sm lg:h-[calc(100vh-140px)] lg:max-h-[calc(100vh-140px)] lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:ml-[2px]">
          <header className="shrink-0 border-b border-[#e3d8c8] px-4 py-3 md:px-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff9800]/10 text-[#f59e0b]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#14213d] md:text-[17px]">
                      Trợ lý học thuật
                    </h3>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={clearChat}
                className="inline-flex items-center gap-2 rounded-full border border-[#dde5ef] bg-white/70 px-3 py-2 text-xs font-semibold text-[#526179] transition-colors hover:border-[#ff9800]/30 hover:text-[#14213d]"
              >
                <Trash2 className="h-4 w-4" />
                Xóa cuộc trò chuyện
              </button>
            </div>

            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7c8798]">
                Model
              </span>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => {
                    setSelectedModel(e.target.value)
                    try { window.localStorage.setItem(MODEL_STORAGE_KEY, e.target.value) } catch {}
                  }}
                  disabled={loading}
                  className="appearance-none rounded-full border border-[#dde5ef] bg-white/80 py-1 pl-3 pr-7 text-[11px] font-semibold text-[#14213d] shadow-sm outline-none transition-colors hover:border-[#ff9800]/40 focus:border-[#ff9800]/60 focus:ring-1 focus:ring-[#ff9800]/20 disabled:opacity-50"
                >
                  {AVAILABLE_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-[#7c8798]" />
              </div>
            </div>
          </header>

          <div
            ref={scrollRef}
            className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3 pb-4 md:px-4"
          >
            <div className="space-y-3.5">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {loading ? (
                <div className="flex justify-start">
                  <div className="rounded-[18px] border border-[#dde5ef] bg-[#fbf8f2] px-4 py-3 text-[#526179] shadow-sm">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#7c8798]">
                      AI
                    </div>
                    <div className="flex items-center gap-2 text-[14px]">
                      <Loader2 className="h-4 w-4 animate-spin text-[#f59e0b]" />
                      <span>Trợ lý đang suy nghĩ...</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {messages.length <= 1 && !loading ? (
              <div className="mt-5">
                <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#7c8798]">
                  Gợi ý câu hỏi
                </p>
                <div className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto pb-1">
                  {qaQuickQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => handleQuickQuestion(question)}
                      className="shrink-0 rounded-full border border-[#dde5ef] bg-white/80 px-3 py-1.5 text-left text-[11px] font-medium leading-snug text-[#14213d] transition-all hover:border-[#ff9800]/35 hover:bg-[#fff8ec] hover:text-[#f59e0b]"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <footer className="shrink-0 border-t border-[#e3d8c8] p-3 md:p-3">
            <form onSubmit={handleSubmit}>
              <div className="flex items-end gap-3 rounded-[20px] border border-[#dde5ef] bg-white/90 p-2.5 shadow-[0_10px_24px_rgba(20,30,50,0.04)]">
                <textarea
                  ref={composerRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  rows={1}
                  placeholder="Nhập câu hỏi về bài thuyết trình..."
                  className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-[13px] leading-[1.55] text-[#14213d] outline-none placeholder:text-[#90a0b7] disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex h-10 items-center gap-2 rounded-[14px] bg-[#ff9800] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#f59e0b] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Gửi
                </button>
              </div>
            </form>
          </footer>
          </div>
        </aside>
      </div>

    </section>
  )
}
