import { keywordLookup } from "./lookup/guidanceLookup";

const docs = [
  {
    id: "hidratacao",
    title: "Hidratação",
    content: "Texto longo sobre hidratação...",
    format: "text" as const,
    keywords: ["água", "hidratação", "líquidos", "beber"],
    priority: 1
  },
  {
    id: "alimentacao",
    title: "Alimentação",
    content: "Texto longo sobre alimentação...",
    format: "text" as const,
    keywords: ["alimentação", "nutrição", "vitaminas"],
    priority: 2
  },
  {
    id: "acido-folico",
    title: "Ácido Fólico",
    content: "Texto longo sobre ácido fólico...",
    format: "text" as const,
    keywords: ["ácido fólico", "vitamina b9", "suplemento"],
    priority: 0
  }
]

const result = keywordLookup(docs, "água", 5)

console.log(JSON.stringify(result, null, 2))