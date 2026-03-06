
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
