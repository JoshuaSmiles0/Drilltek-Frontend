import { dev } from "$app/environment";
import { drilltekService } from "$lib/services/drilltek-service.js";
import { error, redirect } from "@sveltejs/kit";



export const actions = {

    login: async({request, cookies, params}) => {
        const form = await request.formData();
        const email =  params.email as string;
        const password = form.get("password") as string;
        if (email === "" || password === "") {
             throw error(401,{
                              message:"Invalid Credentials, Please Try Again ",
                              status:401,
                              email:params.email
                          })
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
                throw error(401,{
                              message:"invalid Credentials, Please Try Again ",
                              status:401,
                              email:params.email
                          })
            }
        }
    },
}