import { Parser } from "npm:@dbml/core";
import { DSFieldType, DSField, DSTable } from "../DSTypes.ts";

export function ParseDbml(filepath: string): DSTable[] {
    const dbml: string = Deno.readTextFileSync(filepath);

    const parser = new Parser();
    const database = parser.parse(dbml, 'dbml');

    const tables: DSTable[] = []
    database.schemas.forEach(schema => {
        schema.tables.forEach(table => {
            const dstable: DSTable = new DSTable();
            dstable.name = table.name;
    
            table.fields.forEach(field => {
                const dsfield: DSField = new DSField();
                
                dsfield.name = field.name;
                dsfield.type = MapType(field.type.type_name)
                dsfield.type_args = field.type.args || "";
                dsfield.not_null = !!field.not_null;
                dsfield.pk = !!field.pk;
                dsfield.unique = !!field.unique;
                dsfield.increment = !!field.increment;
    
                dstable.fields.push(dsfield);
            });
    
            tables.push(dstable);
        });
    });

    return tables;
}

function MapType(type: string): DSFieldType {
    let retType: DSFieldType = DSFieldType.Unknown;

    switch(type) {
        case "tinyint":
            retType = DSFieldType.TinyInt;
            break;
        case "smallint":
            retType = DSFieldType.SmallInt;
            break;
        case "int":
        case "integer":
            retType = DSFieldType.Int;
            break;
        case "bigint":
            retType = DSFieldType.BigInt;
            break;

        case "decimal":
            retType = DSFieldType.Decimal;
            break;
        case "float":
            retType = DSFieldType.Float;
            break;
        case "double":
            retType = DSFieldType.Double;
            break;
        
        case "char":
        case "nchar":
            retType = DSFieldType.Char;
            break;
        
        case "varchar":
        case "nvarchar":
        case "text":
        case "ntext":
            retType = DSFieldType.VarChar;
            break;
        
        case "date":
            retType = DSFieldType.Date;
            break;
        case "time":
            retType = DSFieldType.Time;
            break;
        case "datetime":
            retType = DSFieldType.DateTime;
            break;
        case "timestamp":
            retType = DSFieldType.TimeStamp;
            break;

        case "binary":
        case "varbinary":
        case "blob":
        case "bytea":
        case "image":
            retType = DSFieldType.Binary;
            break;
        
        case "bit":
        case "boolean":
        case "bool":
            retType = DSFieldType.Bit;
            break;
        
        case "enum":
            retType = DSFieldType.Enum;
            break;
        case "set":
            retType = DSFieldType.Set;
            break;
    
        default:
            if(type.includes("varchar")) {
                retType = DSFieldType.VarChar;
            }
    }

    return retType;
}
