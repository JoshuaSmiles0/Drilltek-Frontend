import type { Session } from "$lib/types/drilltek-types";
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
        const response = await axios.post(`${this.baseUrl}user/login`, {"email":email, "password":password})
        try {
        if (response.status === 200) {
             axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access;
             const session: Session = {
                email: email,
                accessToken: response.data.access,
                refreshToken: response.data.refresh
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
}