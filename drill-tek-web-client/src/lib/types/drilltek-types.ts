
// Auth details type for storage in cookie
export interface Session {
    email : string | null,
    accessToken : string,
    refreshToken: string,
    userid: number
}

export interface editProgram {
    orebody : string,
    location: string,
    target: string,
}

export interface AddProgram extends editProgram {
    programid : string,
    totalholes: number,
    totalmeters: number,
    userid: number,
}

// type modelled for individual drill program
export interface DrillProgram extends AddProgram {
    dateplanned: Date,
    dateupdated: Date
}

export interface EditDrillhole {
    xcoord: number,
    ycoord: number,
    zcoord: number,
    dip: number,
    azimuth: number,
    length: number,
    type: number,
}

export interface AddDrillhole extends EditDrillhole {
    programid: string,
    userid: number,
}

export interface Drillhole extends AddDrillhole {
    holeid : number,
    dateplanned:Date,
    dateupdated:Date

}

export interface AddLithLog {
    start:number,
    end:number,
    lithcode:string,
    comment:string,
    lithology:string,
    holeid:number,
    userid:number
}

export interface Lithlog extends AddLithLog {
    index: number,
    dateLogged: Date
}

export interface AddMineralLog {
    sampleid:string,
    start:number,
    end:number,
    estimate:number,
    comment:string,
    sampletype:string,
    texture:string,
    holeid:number,
    userid:number
}

export interface Minerallog extends AddMineralLog {
    zn:number,
    pb:number,
    fe:number,
    ag:number,
    assaysUploaded:boolean,
    dateLogged: Date
}

export interface AddAlterationLog {
    start:number,
    end:number,
    alterationcode:string,
    comment:string,
    alterationtype:string,
    holeid:number,
    userid:number
}

export interface Alterationlog extends AddAlterationLog {
    index: number,
    dateLogged: Date
}

export interface AddStructureLog {
    start:number,
    end:number,
    structurecode:string,
    comment:string,
    structuretype:string,
    dip:number,
    holeid:number,
    userid:number
}

export interface Structurelog extends AddStructureLog {
    index: number,
    dateLogged: Date
}
