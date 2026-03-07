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
    const holes = await drilltekService.getDrillholeByProgramId(session.accessToken, params.programid)
    console.log(program)
    return {
      program,
      holes,
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
      },

      addDrillhole: async({request, params, cookies}) => {
      const cookiestr = cookies.get("drilltekUser")
      if(cookiestr) {
        const session = JSON.parse(cookiestr) as Session
        if(session){
          const form = await request.formData();
          const xcoordstr = form.get("xcoord") as string | null
          const xcoord = xcoordstr ? parseFloat(xcoordstr).toFixed(2) : 0.00
          const ycoordstr = form.get("ycoord") as string | null
          const ycoord = ycoordstr ? parseFloat(ycoordstr).toFixed(2) : 0.00
          const zcoordstr = form.get("zcoord") as string | null
          const zcoord = zcoordstr ? parseFloat(zcoordstr).toFixed(2) : 0.00
          const dipstr = form.get("dip") as string | null
          const dip = dipstr ? parseFloat(dipstr).toFixed(2) : 0.00
          const azimuthstr = form.get("azimuth") as string | null
          const azimuth = azimuthstr ? parseFloat(azimuthstr).toFixed(2) : 0.00
          const lengthstr = form.get("length") as string | null
          const length = lengthstr ? parseFloat(lengthstr).toFixed(2) : 0.00
          const typestr = form.get("type") as string | null
          const type = typestr ? parseInt(typestr) : 1
          const drillhole = {
            xcoord: xcoord as number,
            ycoord:ycoord as number,
            zcoord:zcoord as number,
            dip:dip as number,
            azimuth: azimuth as number,
            length: length as number, 
            type:type as number,
            programid:params.programid as string,
            userid: session.userid as number
          }
          const response = await drilltekService.createDrillhole(session.accessToken,drillhole)
          if(response === 201) {
            return
          }
          else if (response === 401) {
            const refreshtry = await refresh(session.refreshToken,cookies)
            if(refreshtry) {
               const res = await drilltekService.createDrillhole(session.accessToken,drillhole)
               if(res === 201) {
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