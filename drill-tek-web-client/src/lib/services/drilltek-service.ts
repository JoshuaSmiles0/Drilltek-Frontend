import type { Session, DrillProgram, AddProgram } from "$lib/types/drilltek-types"
import axios from "axios";

export const drilltekService = {

    baseUrl:"http://localhost:8000/api/",

    async checkUser(email:string) : Promise<boolean | null> {
        let login = false
        try {
            const response = await axios.post(`${this.baseUrl}user/checkUser`,
                {"email":email}
            );
            if (response.data.message === "Proceed to login" ) {
                login = true 
                return login
            }
            else if (response.data.message === "Proceed to password change") {
                login = false
                return login 
            }
            else {
                return null
            }
        } catch(error) {
            console.log(error)
            return null
        }
    },

    async setPassword(email:string, oldPassword:string, password:string) : Promise<boolean | null> {
        let passwordSet = false
        try {
            const response = await axios.patch(`${this.baseUrl}user/setPassword`, {
                "email":email, 
                "password":password, 
                "oldPassword":oldPassword
            });
            if (response.status === 200) {
                passwordSet = true
                console.log("this did work")
                return passwordSet
            } 
            else {
                passwordSet = false
                console.log("this didnt work")
                return passwordSet
            }
        }
        catch(error) {
            console.log(error)
            return null
        }
    },

    async login(email:string | null, password:string): Promise<Session | null> {
        try {
        const response = await axios.post(`${this.baseUrl}user/login`, {"email":email, "password":password})
        if (response.status === 200) {
             axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
             const session: Session = {
                email: email,
                accessToken: response.data.access,
                refreshToken: response.data.refresh,
                userid: response.data.userid
             };
             return session
        }
        else {
            return null
        }
    }
        catch (error) {
            console.log(error)
            return null
        }

    },

    async refreshToken(token:string|null): Promise<string|null> {
        try {
            const response = await axios.post(`${this.baseUrl}token/refresh`, {"refresh":token})
            if (response.status ===200) {
                return response.data.access
            }
            else {
                return null
            }
        }
        catch(error){
            console.log(error)
            return null
        }

    },

    async getPrograms(token:string): Promise<DrillProgram[]> {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}drillProgram/getPrograms`)
            return response.data.data as DrillProgram[]
        }
        catch(error){
            console.log(error)
            return []
        }
    },

    async createDrillProgram(token:string, program:AddProgram) {
        try {
             axios.defaults.headers.common["Authorization"] = "Bearer " +token;
             const response = await axios.post(`${this.baseUrl}drillProgram/createProgram`,{
                 "programid":program.programid,
                 "orebody":program.orebody,
                 "location":program.location,
                 "target":program.target,
                 "totalholes":program.totalholes,
                 "totalmeters":program.totalmeters,
                 "userid":program.userid
             })
             console.log(`${program.programid} added`)
             return response.status
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(error: any) {
            console.log(error)
            if(error.response.status) {
            return error.response.status
            }
            else {
                return 500
            }
        }
    },

    async getProgramById(token:string, id:string) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}drillProgram/getProgramById`,{
                params: {programid:id}
            })
            console.log(`${id} returned`)
            return response.data.data as DrillProgram
        }
        catch(error){
            console.log(error)
            return {}
        }
    }
}