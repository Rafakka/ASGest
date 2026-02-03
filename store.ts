export type ContentStore= {
    weeks: Record <number, WeekContent>
}

export type WeekContent = {
    resumo:string
    cuidadosBasicos: string[]
    duvidasComuns: string[]
}

export const contentStore: ContentStore = {
    weeks: {
        6 : {
        resumo:
        "Nessa Semana, o embriao está em rapido desenvolvimento e o coração já começa a bater.",
        cuidadosBasicos: [
            "Evitar consumo de alcool",
            "Manter alimentação Equilibrada",
            "Iniciar ou manter o uso de ácido fólico"
        ],
        duvidasComuns: [
            "Cólicas leves são normais?",
            "È Normal sentir muito sono?"
        ]
        }
    }
}