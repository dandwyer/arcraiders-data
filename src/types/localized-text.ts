import * as z from "zod"; // https://zod.dev/basics

export const LocalizedText = z
  .object({
    // Match the locales defined by:
    //  https://github.com/RaidTheory/arcraiders-data/tree/main/arctracker-ui
    da: z.string(),
    de: z.string(),
    en: z.string(),
    es: z.string(),
    fr: z.string(),
    he: z.string(),
    hr: z.string(),
    it: z.string(),
    ja: z.string(),
    "ko-KR": z.string(),
    no: z.string(),
    pl: z.string(),
    "pt-BR": z.string(),
    pt: z.string(),
    ru: z.string(),
    sr: z.string(),
    tr: z.string(),
    uk: z.string(),
    "zh-CN": z.string(),
    "zh-TW": z.string()
  })
  .describe("LocalizedText");
