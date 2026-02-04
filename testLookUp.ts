import { lookupGuidance } from "./lookup/guidanceLookup";

const result = lookupGuidance(1,"basicCare")

console.log(JSON.stringify(result, null, 2))