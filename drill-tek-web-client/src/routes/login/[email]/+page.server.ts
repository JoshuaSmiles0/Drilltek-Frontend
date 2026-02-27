import { dev } from "$app/environment";
import { drilltekService } from "$lib/services/drilltek-service.js";
import { redirect } from "@sveltejs/kit";



export const actions = {

    login: async({request, cookies, params}) => {
        const form = await request.formData();
        const email =  params.email as string;
        const password = form.get("password") as string;
        if (email === "" || password === "") {
            throw redirect(302, "/")
        }
        else {
            const response = await drilltekService.login(email,password)
            if(response) {
                const userDetails = JSON.stringify(response);
                cookies.set("drilltekUser", userDetails, {
                     path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: !dev,
          maxAge: 60 * 60 * 24 * 7 // one week
                });
                throw redirect(303,"/mainportal")
            }
            else {
                throw redirect(302,"/")
            }
        }
    },
}