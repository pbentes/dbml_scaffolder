// deno-lint-ignore no-unused-vars
import Handlebars from "npm:handlebars";
import { DSTable } from "./dstypes.ts";
import { ParseDbml } from "./dbml.ts";

function main() {
    const tables: DSTable[] = ParseDbml("test1.dbml");
    console.log(tables)
}

if (import.meta.main) {
    main();
}
