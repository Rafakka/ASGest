import { runCore } from "./core";

const result = runCore({
    today:new Date("2026.02-01"),
    lastPeriodDate: new Date("2025-12-15")
})

console.log("Gestational week: ", result.semanaGestacional)
console.log("Full snapshot: ", result)