import { drilltekService } from "$lib/services/drilltek-service";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Lithlog, Session } from "$lib/types/drilltek-types";
import { refresh, setLithType } from "$lib/services/drilltek-utils.js";





export const load: PageServerLoad = async ({ parent, params }) => {
const { session } = await parent();
  if (session) {
    try {
    const holeid = parseInt(params.holeid)
    const hole = await drilltekService.getDrillholeById(session.accessToken, holeid )
    const lithlog = await drilltekService.getLithLog(session.accessToken, holeid)
    const alterationlog = await drilltekService.getAlterationLog(session.accessToken, holeid)
    const structurelog = await drilltekService.getStructureLog(session.accessToken, holeid)
    const minerallog = await drilltekService.getMineralLog(session.accessToken, holeid)
    console.log(lithlog)
    console.log(alterationlog)
    console.log(structurelog)
    console.log(minerallog)
    return {
      hole,
      lithlog,
      alterationlog,
      structurelog,
      minerallog,
      session,
  }}
  catch(error) {
    console.log(error)
  }
}
  else {
    redirect(302,"/logout")
  }}


  export const actions = {
        uploadLith:async({request, cookies, params}) => {
          const cookiestr = cookies.get("drilltekUser")
      if(cookiestr) {
        const session = JSON.parse(cookiestr) as Session
        if(session){
          const form = await request.formData();
          const data = form.get('lithLog') as string
          const log = JSON.parse(data) as Lithlog[]
          const updatedLog = setLithType(log)
          const hole = params.holeid
          const holeInt = parseInt(hole)
          const res = await drilltekService.deleteLithLogByHoleid(session.accessToken, holeInt)
          if(res === 200) {
            const response = await drilltekService.addLithLog(session.accessToken, updatedLog )
            if(response === 201){
              return "Lithlog Saved"
            }
            else if (response === 401) {
              const refreshtry = await refresh(session.refreshToken,cookies)
                          if(refreshtry) {
               const response = await drilltekService.addLithLog(session.accessToken, updatedLog )
               if(response === 201) {
                return "Lithlog Saved"
               }
               else {
                return "Unable to upload log, please check fields"
               }
            }
            }
          }
          else if (res === 401) {
            const refreshtry = await refresh(session.refreshToken,cookies)
            if(refreshtry) {
               const res = await drilltekService.deleteLithLogByHoleid(session.accessToken, holeInt)
               if(res === 200) {
                const response = await drilltekService.addLithLog(session.accessToken, updatedLog )
                 if(response === 201){
              return "Lithlog Saved"
            }
            else if (response === 401) {
              const refreshtry = await refresh(session.refreshToken,cookies)
                          if(refreshtry) {
               const response = await drilltekService.addLithLog(session.accessToken, updatedLog )
               if(response === 201) {
                return "Lithlog Saved"
               }
               else {
                return "Unable to upload log, please check fields"
               }
              }
               }
               else {
                return "Unable to upload log, please check fields"
               }
            }
          }
        }
          else {
            return "Unable to upload log, please check fields"
          }
        }
      }
    }
  }
   
     





  