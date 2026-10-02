import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  transcript: z.string().min(1).max(4000),
  lang: z.enum(["en", "hi", "mr"]),
  animals: z.array(z.object({ id: z.string(), name: z.string(), species: z.string() })).max(100),
  symptoms: z.array(z.string()).max(50),
});

export type VoiceCase = {
  animalId: string | null;
  symptoms: string[];
  urgency: "low" | "medium" | "high";
  summary: string;
  reason: string;
};

export const analyseVoiceCase = createServerFn({ method: "POST" })
  .inputValidator((d) => Input.parse(d))
  .handler(async ({ data }): Promise<{ ok: true; case: VoiceCase } | { ok: false; error: string }> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { ok: false, error: "AI is not configured." };
    const { createOpenAI } = await import("@ai-sdk/openai");
    const { streamText } = await import("ai");

    const langName = { en: "English", hi: "Hindi", mr: "Marathi" }[data.lang];
    const system = `You are a livestock health assistant for Indian farmers. A farmer described an animal's problem by voice (may be Marathi, Hindi or English, possibly with speech-recognition mistakes).
Return ONLY a JSON object with keys:
- "animalId": the id of the matching animal from the list, or null if unclear
- "symptoms": array of symptom strings chosen ONLY from the allowed list
- "urgency": "low", "medium" or "high" (high = needs a vet today: not eating + fever, breathing trouble, bleeding, mouth/foot blisters, collapse, many symptoms)
- "summary": one short sentence in ${langName} describing the case
- "reason": one short sentence in ${langName} explaining the urgency
Animals: ${JSON.stringify(data.animals)}
Allowed symptoms: ${JSON.stringify(data.symptoms)}`;

    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });
    try {
      const result = streamText({
        model: provider.responses("openai/gpt-6-astra"),
        system,
        prompt: `Farmer said: """${data.transcript}"""`,
        maxRetries: 0,
        providerOptions: {
          openai: {
            forceReasoning: true,
            reasoningEffort: "low",
            reasoningSummary: "auto",
            store: false,
            include: ["reasoning.encrypted_content"],
          },
        },
      });
      const text = await result.text;
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) return { ok: false, error: "Could not understand the description." };
      const raw = JSON.parse(match[0]);
      const ids = new Set(data.animals.map((a) => a.id));
      const allowed = new Set(data.symptoms);
      const urgency = ["low", "medium", "high"].includes(raw.urgency) ? raw.urgency : "medium";
      return {
        ok: true,
        case: {
          animalId: ids.has(raw.animalId) ? raw.animalId : null,
          symptoms: Array.isArray(raw.symptoms) ? raw.symptoms.filter((s: string) => allowed.has(s)) : [],
          urgency,
          summary: String(raw.summary ?? ""),
          reason: String(raw.reason ?? ""),
        },
      };
    } catch (e: any) {
      const status = e?.statusCode ?? e?.status;
      if (status === 429) return { ok: false, error: "Too many requests. Please try again in a minute." };
      if (status === 402) return { ok: false, error: "AI credits are used up. Please add credits." };
      console.error("analyseVoiceCase failed", e);
      return { ok: false, error: "AI could not process this right now." };
    }
  });
