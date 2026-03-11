
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
