import type { Session, DrillProgram, AddProgram, editProgram, Drillhole, AddDrillhole, EditDrillhole, Lithlog, Alterationlog, Structurelog, Minerallog, AddLithLog } from "$lib/types/drilltek-types"
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

    async getUserEmailById(token:string, id:number) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}user/getEmail`,{
                params:{userid:id}
            })
            console.log(response.data.email)
            return(response.data.email)
        }
        catch (error) {
            console.log(error)
            return ""
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
    },

    async editProgram(token:string, newDetails:editProgram, originalId:string) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.patch(`${this.baseUrl}drillProgram/editProgram`, {
                "originalid":originalId,
                "program":{
                  "orebody":newDetails.orebody,
                  "location":newDetails.location,
                  "target":newDetails.target
                }
            })
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

    async getDrillholeByProgramId(token:string, programid:string) {
         try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}drillhole/getDrillholesByProgramId`,{
                params: {programid:programid}
            })
            console.log(`drillholes for ${programid} returned`)
            return response.data.data as Drillhole[]
        }
        catch(error){
            console.log(error)
            return []
        } 

    },

    async createDrillhole(token:string, drillhole: AddDrillhole) {
        try {
             axios.defaults.headers.common["Authorization"] = "Bearer " +token;
             const response = await axios.post(`${this.baseUrl}drillhole/addDrillhole`,{
                 "xcoord":drillhole.xcoord,
                 "ycoord":drillhole.ycoord,
                 "zcoord":drillhole.zcoord,
                 "dip":drillhole.dip,
                 "azimuth":drillhole.azimuth,
                 "length":drillhole.length,
                 "type":drillhole.type,
                 "programid": drillhole.programid,
                 "userid": drillhole.userid
             })
             console.log(`drillhole added`)
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

    async getDrillholeById(token:string, id:number) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}drillhole/getDrillholeById`,
                {
                    params:{holeid:id}
                }
            )
            console.log(`${id} returned`)
            return response.data.data as Drillhole
        }
        catch(error){
        console.log(error)
        return {}
        }
    },


    async editDrillhole(token:string, newDetails:EditDrillhole, originalId: number) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.patch(`${this.baseUrl}drillhole/editDrillhole`, {
                "originalid":originalId,
                "drillhole":{
                 "xcoord":newDetails.xcoord,
                 "ycoord":newDetails.ycoord,
                 "zcoord":newDetails.zcoord,
                 "dip":newDetails.dip,
                 "azimuth":newDetails.azimuth,
                 "length":newDetails.length,
                 "type":newDetails.type
                }
            })
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


    async getLithLog(token:string, holeid:number) {
        try{
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}lithlog/getlithlogbyholeid`, {
                params:{holeid}
            })
            console.log(`lith logs for ${holeid} returned`)
            if(response.data.data.length !== 0) {
            return response.data.data as Lithlog[]
            }
            else {
                return null
            }
        }
        catch(error) {
            console.log(error)
        }
    },

    async deleteLithLogByHoleid(token:string, holeid:number) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.delete(`${this.baseUrl}lithlog/deleteLithLog`, {
                params:{holeid:holeid}
            })
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

    async addLithLog(token:string, logs:AddLithLog[]) {
        try {
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.post(`${this.baseUrl}lithlog/addLithLog`, logs)
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

        async getAlterationLog(token:string, holeid:number) {
        try{
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}altlog/getAlterationlogByHoleid`, {
                params:{holeid}
            })
            console.log(`Alteration logs for ${holeid} returned`)
            if(response.data.data.length !== 0) {
            return response.data.data as Alterationlog[]
            }
            else {
                return null
            }
        }
        catch(error) {
            console.log(error)
            return null
        }
    },

        async getStructureLog(token:string, holeid:number) {
        try{
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}struclog/getStructurelogByHoleid`, {
                params:{holeid}
            })
            console.log(`structure logs for ${holeid} returned`)
            if(response.data.data.length !== 0) {
            return response.data.data as Structurelog[]
            }
            else {
                return null
            }
        }
        catch(error) {
            console.log(error)
            return null
        }
    },

        async getMineralLog(token:string, holeid:number) {
        try{
            axios.defaults.headers.common["Authorization"] = "Bearer " +token;
            const response = await axios.get(`${this.baseUrl}minlog/getMinerallogByHoleid`, {
                params:{holeid}
            })
            console.log(`mineral logs for ${holeid} returned`)
            if(response.data.data.length !== 0) {
              return response.data.data as Minerallog[]
            }
            else {
                return null
            }
            
        }
        catch(error) {
            console.log(error)
            return null
        }
    },



}