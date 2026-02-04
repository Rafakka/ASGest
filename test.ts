import { runCore } from "./core";

const result = runCore({
    today:new Date("2026.02-01"),
    lastPeriodDate: new Date("2025-11-25")
})

console.log(JSON.stringify(result, null, 2))
