export function formatDateBR(date:Date): string {
    return new Intl.DateTimeFormat("pt-BR").format(date)
}

export function formatGestationalWeek(week:number):
string {
    if (week === 1){
        return '1 semana'
        }
    return `${week} semanas`
}
