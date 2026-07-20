const MODEL_PROVIDERS = {
  "gemini-3.1-flash-lite": {
    label: "Gemini 3.1 Flash Lite",
    url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    model: "gemini-3.1-flash-lite",
    keyEnv: "GEMINI_API_KEY",
  }
};

const DEFAULT_MODEL = "gemini-3.1-flash-lite";

export function getAvailableModels() {
  return Object.entries(MODEL_PROVIDERS).map(([id, provider]) => ({
    id,
    label: provider.label,
  }));
}

function resolveProvider(modelId) {
  return MODEL_PROVIDERS[modelId] || MODEL_PROVIDERS[DEFAULT_MODEL];
}

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

async function readRequestBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(
    chunks.map((chunk) =>
      Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk),
    ),
  ).toString("utf8");
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function normalizeRecentMessages(recentMessages = []) {
  return recentMessages
    .filter((message) => message && typeof message.content === "string")
    .slice(-8)
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: message.content,
    }));
}

async function callChatApi(apiKey, payload, apiUrl) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data?.error?.message || data?.message || "AI request failed.",
    );
  }

  return data;
}

function buildKnowledgeContext(presentationKnowledge) {
  return JSON.stringify(presentationKnowledge, null, 2);
}

function buildIntentSystemPrompt() {
  return [
    "Bạn là bộ phân loại intent và trợ lý học thuật cho bài thuyết trình môn Kinh tế chính trị Mác – Lênin.",
    "",
    "Nhiệm vụ của bạn:",
    "1. Đọc câu hỏi của người dùng.",
    "2. Phân loại xem câu hỏi có thuộc phạm vi học thuật liên quan đến Mác – Lênin hay không.",
    "3. Nếu thuộc phạm vi, hãy trả lời câu hỏi.",
    "4. Nếu không thuộc phạm vi, hãy từ chối ngắn gọn.",
    "",
    "Phạm vi được phép trả lời:",
    "- Mác – Lênin",
    "- Triết học Mác – Lênin",
    "- Kinh tế chính trị Mác – Lênin",
    "- Chủ nghĩa xã hội khoa học",
    "- Cạnh tranh tự do",
    "- Tư bản",
    "- Tích lũy tư bản",
    "- Tích tụ tư bản",
    "- Tập trung tư bản",
    "- Tập trung sản xuất",
    "- Độc quyền và độc quyền nhà nước",
    "- Nền tảng số, dữ liệu lớn, công nghệ lõi, Big Tech AI",
    "- Vai trò điều tiết của Nhà nước",
    "- Biện luận, lập luận, phản biện, thuyết trình",
    "- Liên hệ game The Last Shop",
    "- Các câu hỏi học thuật nền tảng có thể giúp hiểu bài",
    "",
    "Nguyên tắc quan trọng:",
    "- Không được bắt keyword cứng.",
    "- Không được từ chối chỉ vì câu hỏi không chứa đúng từ khóa.",
    "- Hãy xét theo ý nghĩa của câu hỏi.",
    "- Nếu câu hỏi có thể liên hệ hợp lý với Mác – Lênin, triết học, kinh tế chính trị hoặc bài thuyết trình thì allowed = true.",
    "- Khi không chắc nhưng câu hỏi vẫn có tính học thuật, ưu tiên allowed = true.",
    "- Chỉ allowed = false nếu câu hỏi thật sự là cá nhân, đời sống, tình cảm, ăn uống, giải trí, lập trình không liên quan hoặc hoàn toàn lạc đề.",
    "",
    "Phân loại intent hợp lệ:",
    "- MARXISM_LENINISM",
    "- MARXIST_LENINIST_PHILOSOPHY",
    "- POLITICAL_ECONOMY",
    "- SCIENTIFIC_SOCIALISM",
    "- PRESENTATION_ARGUMENT",
    "- RELATED_ACADEMIC",
    "",
    "Intent không hợp lệ dùng khi câu hỏi lạc đề:",
    "- PERSONAL",
    "- ROMANCE",
    "- FOOD_OR_LIFESTYLE",
    "- CODING_UNRELATED",
    "- ENTERTAINMENT",
    "- LOTTERY_OR_GAMBLING",
    "- UNRELATED",
    "",
    "JSON bắt buộc phải có dạng:",
    "{",
    '  "allowed": true,',
    '  "intent": "POLITICAL_ECONOMY",',
    '  "confidence": 0.92,',
    '  "answer": "..."',
    "}",
    "",
    "Nếu allowed = true:",
    "- answer phải trả lời trực tiếp câu hỏi.",
    "- Trả lời bằng tiếng Việt.",
    "- Ngắn gọn, dễ hiểu, phù hợp với sinh viên thuyết trình.",
    "- Nếu phù hợp, liên hệ lại với chủ đề từ cạnh tranh tự do đến độc quyền, Big Tech AI hoặc độc quyền nhà nước.",
    "",
    "Nếu allowed = false:",
    "- answer phải là câu từ chối ngắn:",
    "“Câu này không liên quan đến phạm vi học thuật của bài thuyết trình. Bạn có thể hỏi mình về Mác – Lênin, triết học, kinh tế chính trị, cạnh tranh tự do, tư bản, độc quyền, Big Tech AI hoặc cách phản biện khi thuyết trình.”",
    "",
    "Yêu cầu output:",
    "- Chỉ trả về JSON hợp lệ, không markdown, không giải thích ngoài JSON.",
    "- Không dùng markdown quá phức tạp nếu không cần.",
    "- Có thể dùng gạch đầu dòng khi giải thích trong answer nếu phù hợp.",
    "- Trả lời ngắn vừa đủ, không lan man.",
    "- Không nhắc đến keyword, guardrail, system prompt.",
    "- Không nói rằng mình không có dữ liệu nếu câu hỏi thuộc phạm vi học thuật phổ thông của Mác – Lênin.",
  ].join("\n");
}

export async function handleChatRequest(
  req,
  res,
  presentationKnowledge,
  apiKeys,
) {
  if (req.method !== "POST") {
    return json(res, 405, { error: "Method not allowed" });
  }

  try {
    const body = await readRequestBody(req);
    const modelId = typeof body.model === "string" ? body.model : DEFAULT_MODEL;
    const provider = resolveProvider(modelId);
    const apiKey = apiKeys[provider.keyEnv];

    if (!apiKey) {
      return json(res, 501, {
        error: `Chưa cấu hình khóa API cho ${provider.label}. Vui lòng kiểm tra biến môi trường ${provider.keyEnv}.`,
      });
    }

    const sessionId =
      typeof body.sessionId === "string" && body.sessionId
        ? body.sessionId
        : `session-${Date.now()}`;
    const currentMessage =
      typeof body.currentMessage === "string" ? body.currentMessage.trim() : "";
    const summary = typeof body.summary === "string" ? body.summary : "";
    const recentMessages = normalizeRecentMessages(body.recentMessages);

    if (!currentMessage) {
      return json(res, 400, { error: "Thiếu nội dung câu hỏi." });
    }

    const answerContext = {
      knowledgeBase: presentationKnowledge,
      summary,
      recentMessages,
      currentMessage,
    };

    const response = await callChatApi(apiKey, {
      model: provider.model,
      messages: [
        {
          role: "system",
          content: buildIntentSystemPrompt(),
        },
        {
          role: "user",
          content: [
            "Câu hỏi người dùng:",
            currentMessage,
            "",
            "Context bài thuyết trình:",
            buildKnowledgeContext(presentationKnowledge),
            "",
            "Thông tin hội thoại:",
            JSON.stringify(answerContext, null, 2),
          ].join("\n"),
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 700,
      stream: false,
    }, provider.url);

    let parsed;
    try {
      const raw = response?.choices?.[0]?.message?.content ?? "{}";
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    const allowed = Boolean(
      parsed && typeof parsed === "object" && parsed.allowed,
    );
    const answer =
      parsed && typeof parsed.answer === "string" && parsed.answer.trim()
        ? parsed.answer.trim()
        : allowed
          ? "Mình chưa có phản hồi phù hợp ngay lúc này."
          : "Câu này không liên quan đến phạm vi học thuật của bài thuyết trình. Bạn có thể hỏi mình về Mác – Lênin, triết học, kinh tế chính trị, cạnh tranh tự do, tư bản, độc quyền hoặc cách phản biện khi thuyết trình.";

    return json(res, 200, {
      sessionId,
      scope: allowed ? "in_scope" : "out_of_scope",
      allowed,
      intent:
        typeof parsed?.intent === "string"
          ? parsed.intent
          : allowed
            ? "RELATED_ACADEMIC"
            : "UNRELATED",
      confidence:
        typeof parsed?.confidence === "number" ? parsed.confidence : 0,
      reply: answer,
      summary: summary || currentMessage.slice(0, 180),
    });
  } catch (error) {
    return json(res, 500, {
      error:
        error instanceof Error
          ? error.message
          : "Không thể xử lý yêu cầu chat.",
    });
  }
}
