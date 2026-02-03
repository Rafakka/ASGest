export function calculateGestationalWeek(
    today:Date,
    lastPeriodDate: Date
): number {
    const msPerDay = 1000 * 60 * 60 * 24
    const diffMs = today.getTime() - lastPeriodDate.getTime()
    const diffDays = Math.floor(diffMs / msPerDay)

    return Math.floor(diffDays / 7)
}
