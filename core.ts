import {Skill, SkillOutput} from './baseSkill'
import { ContentStore } from './store'
import { Context } from './travellingData'
import { calculateGestationalWeek } from './calculator'
import { formatGestationalWeek } from './normalizer'
import { tutorialSkill } from './tutorialSkill'
import { weekInfoSkill } from './skills/weekInfoSkill'
import { fallbackWeekSkill } from './skills/fallbackWeekSkill'

type PublicSnapshot = {
    semanaGestacional:string,
    semanaNumero:number,
    outputs:SkillOutput[]
}

const skills: Skill[] = [
    tutorialSkill,
    weekInfoSkill,
    fallbackWeekSkill,
    
]

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
        if(skill.applies(context, contentStore)){
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