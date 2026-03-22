import { drilltekService } from '$lib/services/drilltek-service.js';
import { error, redirect } from '@sveltejs/kit';



export const actions = {

    changePassword: async({request, params}) => {
        const form = await request.formData();
        const email =  params.email as string;
        console.log(email)
        const password = form.get("password") as string;
        const oldPassword = form.get("oldPassword") as string;
        if (email === "" || password === "" || oldPassword === "") {
           throw error(400, {
                message:"Please Enter All Fields",
                email:email,
                status:400,
            })
        }
        else {
            const success = await drilltekService.setPassword(email,oldPassword,password)
            if (success === true) {
                throw redirect(303, `/login/${email}`)
            }
            else if (success === false) {
               throw error(401,{
                    message:"Invalid Credentials, Please Try Again",
                    status:401,
                    email: email,
                })
            }
            else {
               throw error(500,{
                    message:"Unable to process request at this time. Please Try Again",
                    email:email,
                    status:500
                })
            }
        }
    },
}