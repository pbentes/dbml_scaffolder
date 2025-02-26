export enum DSFieldType {
    Unknown = -1,

    TinyInt = 0,
    SmallInt,
    Int,
    BigInt,

    Decimal = 10,
    Float,
    Real,
    Double,

    Char = 20,

    VarChar = 30,
    Text,

    Date = 40,
    Time,
    DateTime,
    TimeStamp,

    Binary = 50,

    Bit = 60,

    Enum = 90,
    Set,
}

export class DSField {
    name: string = "";
    type: DSFieldType = DSFieldType.Unknown;
    type_args: string = "";
    unique: boolean = false;
    pk: boolean = false;
    not_null: boolean = false;
    increment: boolean = false;
}

export class DSTable {
    name: string = "";
    fields: DSField[] = []
}