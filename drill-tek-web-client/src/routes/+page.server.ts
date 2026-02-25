import { browser, dev } from "$app/environment";
import { redirect } from "@sveltejs/kit";
import { drilltekService } from "$lib/services/drilltek-service";

export const actions = {

    checkUser: async({ request }) => {
        const form = await request.formData();
        const email = form.get("email") as string
        const res = await drilltekService.checkUser(email)
        console.log(res)
        if (res === true) {
           throw redirect(302, `/login/${email}` )
        }
        else if (res === false) {
           throw redirect(302, `/changepassword/${email}` )
        }
        else {
            throw redirect(302, "/")
        }
    },


}