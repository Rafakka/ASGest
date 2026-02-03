import {Skill, SkillOutput} from './baseSkill'
import { ContentStore } from './store'
import { Context } from './travellingData'
import { calculateGestationalWeek } from './calculator'
import { formatGestationalWeek } from './normalizer'

type PublicSnapshot = {
    semanaGestacional:string,
    semanaNumero:number,
    outputs:SkillOutput[]
}

const skills: Skill[] = []

const contentStore: ContentStore = {
    weeks : {}
}

type CoreInput = {
    today:Date
    lastPeriodDate:Date
}

function resolveContext (input:CoreInput): Context {
    const gestationalWeek = calculateGestationalWeek(
        input.today,
        input.lastPeriodDate,
    )

    return {
        today:input.today,
        lastPeriodDate:input.lastPeriodDate,
        gestationalWeek
    }
}

export function runCore(input:{
    today:Date
    lastPeriodDate:Date
}):PublicSnapshot {

    const context = resolveContext(input)
    const outputs:SkillOutput[] = []

    for (const skill of skills){
        if(skill.applies(context)){
            outputs.push(skill.run(context, contentStore))
        }
    }

    return {
        semanaNumero: context.gestationalWeek,
        semanaGestacional:
        formatGestationalWeek(context.gestationalWeek),
        outputs
    }
}