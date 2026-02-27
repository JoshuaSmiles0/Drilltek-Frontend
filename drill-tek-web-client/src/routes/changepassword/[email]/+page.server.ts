import { drilltekService } from '$lib/services/drilltek-service.js';
import { redirect } from '@sveltejs/kit';



export const actions = {

    changePassword: async({request, params}) => {
        const form = await request.formData();
        const email =  params.email as string;
        console.log(email)
        const password = form.get("password") as string;
        const oldPassword = form.get("oldPassword") as string;
        if (email === "" || password === "" || oldPassword === "") {
            throw redirect(302, "/")
        }
        else {
            const success = await drilltekService.setPassword(email,oldPassword,password)
            if (success === true) {
                throw redirect(303, `/login/${email}`)
            }
            else if (success === false) {
                throw redirect(302, "/")
            }
            else {
                throw redirect(302,"/")
            }
        }
    },
}