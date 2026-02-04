import fs from 'fs'
import path from "path"

type GuidanceDoc = {
    id:string
    title:string
    content:string
    format:"text" | "markdown" | "json"
    keywords:string[]
    priority?:number
}

type ScoreDocs = {
    doc:GuidanceDoc
    score:number
}

export function lookupGuidance (
    week: number,
    category:string
): GuidanceDoc [] {
    const basePath = path.join(
        process.cwd(),
        "guidanceData",
        `week${week}`,
        "docs",
        category
    )
    if (!fs.existsSync(basePath)){
        return []
    }
    const files = fs.readdirSync(basePath)

    return files
        .filter((file) =>
            file.endsWith(".txt") ||
            file.endsWith(".md") ||
            file.endsWith(".json")
        )
        .map((file) => {
            const fullPath = path.join(basePath, file)
            const {format, content, keywords} = readDoc(fullPath)

            return {
                id:file.replace(path.extname(file),""),
                title:humanizeFilename(file),
                content,
                format,
                keywords
                }
            })
        }

function humanizeFilename(file:string): string {
    return file
    .replace(path.extname(file),"")
    .replace(/[-_]/g,"")
    .replace(/\b\w/g,(c)=>c.toUpperCase())
}

function extractMetadata(
    format:"text"|"markdown"|"json",
    rawContent:string
) : {keywords:string[]; cleanContent:string} {
    if (format === "json") {
        const parsed = JSON.parse(rawContent)
        return {
            keywords:parsed.keywords ?? [],
            cleanContent: JSON.stringify(parsed.content ?? parsed)
        }
    }
    const lines = rawContent.split("\n")

    const keywordLine = lines.find((l)=>l.toLowerCase().startsWith("# keywords:"))

    const keywords = keywordLine
    ? keywordLine
    .replace("# keywords:","")
    .split(",")
    .map((k)=> k.trim().toLowerCase())
    : []

    const cleanContent = lines
    .filter((l) => !l.toLowerCase().startsWith("# keywords"))
    .join("\n")
    .trim()

    return {keywords, cleanContent}

}

function readDoc(filePath:string): {
    format: "text" | "markdown" | "json"
    content:string
    keywords:string[]
    }
    {

    const ext = path.extname(filePath)
    const raw = fs.readFileSync(filePath, "utf-8")

    let format:"text" |"markdown"|"json" = "text"
    if (ext === ".md") format = "markdown"
    if (ext === ".json") format = "json"

    const {keywords, cleanContent } = extractMetadata(format, raw)
    
    return {
        format,
        content:cleanContent,
        keywords
    }
}

export function keywordLookup (
    docs:GuidanceDoc[],
    query:string,
    limit = 5
) : GuidanceDoc[] {
    const q = query.toLowerCase()
    
    const scored:ScoreDocs[] = docs.map((doc)=>{
        const score = doc.keywords.filter(
            (k)=>
                k.toLowerCase().includes(q) ||
                k.includes(q)|| q.includes(k)
        ).length

        return {doc, score}
    })

    return scored
    .filter((r)=>r.score>0)
    .sort((a,b) => {if (b.score !== a.score) {return b.score - a.score} return (b.doc.priority ?? 99) - (a.doc.priority ?? 99)})
    .slice(0,limit)
    .map((r)=>r.doc)
}