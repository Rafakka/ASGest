
type GuidanceDoc = {
    id:string
    title:string
    content:string
}

type LookUpQuery = {
    week: number
    category:string
}

type LookUpResult = {
    week:number
    category:string
    docs:GuidanceDoc[]
}

