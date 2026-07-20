import { presentationKnowledge } from '../src/data/presentationKnowledge.js'
import { handleChatRequest } from '../src/lib/chatService.js'

export default async function handler(req, res) {
  const apiKeys = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    TEXAPI_API_KEY: process.env.TEXAPI_API_KEY || '',
  }
  return handleChatRequest(req, res, presentationKnowledge, apiKeys)
}
