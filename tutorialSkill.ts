import { Skill } from "./baseSkill";
import { Context } from "./travellingData";

export const tutorialSkill: Skill = {
    id:"tutorial-inicial",

    applies(ctx:Context) {
        return true
    },

    run(ctx, store) {
        return {
            key:"tutorial",
            data: {
                steps: [
                    {
                        title:"Bem-vinda",
                        description:
                        "Este aplicativo ajuda voce a acompanhar sua gestação com base em informações confiáveis."
                    },
                    {
                        title:"Como calculamos",
                        description:
                        "As semana gestacional é calculada a partir da data da sua ultima menstruação."
                    },
                    {
                        title:"O que voce vai encontrar aqui",
                        description:
                        "Cuidados básicos, sinais importantes e orientações conforme a semana de gestação."
                    },
                    {
                        title:"Importante",
                        description:
                        "Este aplicativo não substitui acompanhamento médico."
                    }
                ]
            }
        }
    }
}
