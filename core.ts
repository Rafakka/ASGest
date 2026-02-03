import {Skill, SkillOutput} from './baseSkill'
import { ContentStore } from './store'
import { Context } from './travellingData'

type Snapshot  = {
    week : number
    outputs:SkillOutput[]
}

const skills: Skill[] = []

const contentStore: ContentStore = {
    weeks : {}
}

function resolveContext (input: {
    today:Date
    startDate: Date
}): Context {
    const diffMs = input.today.getTime()-input.startDate.getTime()
    const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))

    return {
        today:input.today,
        startDate:input.startDate,
        gestationalWeek:diffWeeks
    }
}


export function runCore(input:{
    today:Date
    startDate:Date
}):Snapshot {

    const context = resolveContext(input)
    const outputs = []

    for (const skill of skills){
        if(skill.applies(context)){
            outputs.push(skill.run(context, contentStore))
        }
    }

    return {
        week: context.gestationalWeek,
        outputs
    }
}