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
}