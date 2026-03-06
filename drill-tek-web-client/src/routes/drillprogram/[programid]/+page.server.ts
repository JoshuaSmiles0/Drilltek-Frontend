import { drilltekService } from "$lib/services/drilltek-service";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Session } from "$lib/types/drilltek-types";
import { refresh } from "$lib/services/drilltek-utils";



export const load: PageServerLoad = async ({ parent, params }) => {
const { session } = await parent();
  if (session) {
    try {
    const program = await drilltekService.getProgramById(session.accessToken, params.programid)
    console.log(program)
    return {
      program,
      session
  }}
  catch(error) {
    console.log(error)
  }
}
  else {
    redirect(302,"/logout")
  }}

  export const actions = {
  
      editProgram: async({request, cookies, params}) => {
        const cookiestr = cookies.get("drilltekUser")
        if(cookiestr) {
          const session = JSON.parse(cookiestr) as Session
          if(session){
            const form = await request.formData();
            const currentProgram = params.programid as string
            console.log(currentProgram)
            const program = {
              orebody:form.get("orebody") as string,
              location:form.get("location") as string,
              target:form.get("target") as string,
            }
            const response = await drilltekService.editProgram(session.accessToken,program,currentProgram)
            if(response === 200) {
              return
            }
            else if (response === 401) {
              const refreshtry = await refresh(session.refreshToken,cookies)
              if(refreshtry) {
                 const res = await drilltekService.editProgram(session.accessToken,program,currentProgram)
                 if(res === 200) {
                  return
                 }
                 else {
                  redirect(302,"/")
                 }
              }
            }
            else {
              return
            }
          }
        }
      }
    }