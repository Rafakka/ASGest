import {Context} from './travellingData'
import {ContentStore} from './store'

export type SkillOutput = {
    key:string
    data:any
}

export type Skill = {
    id:string
    applies(ctx:Context, store:ContentStore):boolean
    run (ctx:Context, store:ContentStore):SkillOutput
}