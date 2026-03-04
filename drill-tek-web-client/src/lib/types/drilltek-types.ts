
// Auth details type for storage in cookie
export interface Session {
    email : string | null,
    accessToken : string,
    refreshToken: string
}
// type modelled for individual drill program
export interface DrillProgram {
    programid : string,
    orebody : string,
    location: string,
    target: string,
    totalholes: number,
    totalmeters: number,
    userid: number,
    dateplanned: Date,
    dateupdated: Date
}

