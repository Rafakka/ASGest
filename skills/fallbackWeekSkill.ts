import { Skill } from "../baseSkill";
import { Context } from "../travellingData";
import { ContentStore } from "../store";

export const fallbackWeekSkill : Skill = {
    id:"fallback-semana", 
    applies (ctx:Context, store:ContentStore) {
        return !(ctx.gestationalWeek in store.weeks)
    },

    run(ctx:Context, store:ContentStore) { 
        return {
            key:"sem-conteudo-semana",
            data: {
                semana: ctx.gestationalWeek,
                mensagem:
                "Ainda não há informações especificas para esta semana da gestão. Em breve, novos conteúdos estarão disponiveis.",
                orientação:
                "Continue acompanhando e, em caso de duvidas ou sintomas, procure um profissional de saúde."
            }
        }
    }
}