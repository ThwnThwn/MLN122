import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { presentationKnowledge } from './src/data/presentationKnowledge.js'
import { handleChatRequest } from './src/lib/chatService.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiKeys = {
    GEMINI_API_KEY: env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '',
    TEXAPI_API_KEY: env.TEXAPI_API_KEY || process.env.TEXAPI_API_KEY || '',
  }

  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-chat-api',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url !== '/api/chat' || req.method !== 'POST') {
              next()
              return
            }

            await handleChatRequest(req, res, presentationKnowledge, apiKeys)
          })
        },
      },
    ],
  }
})
