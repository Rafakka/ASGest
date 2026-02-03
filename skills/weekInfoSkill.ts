
import { Skill } from "../baseSkill";

export const weekInfoSkill: Skill = {
    id:"informacoes-semana",

    applies(ctx, store){
        return ctx.gestationalWeek in store.weeks
    },

    run(ctx, store) {
        const content = store.weeks[ctx.gestationalWeek]

        return {
            key: "informações-semana",
            data: {
                semana: ctx.gestationalWeek,
                resumo:content.resumo,
                cuidadosBasico:content.cuidadosBasicos,
                duvidasComuns:content.duvidasComuns,
            }
        }
    },
}