import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { drilltekService } from "$lib/services/drilltek-service";




export const load: PageServerLoad = async ({ parent }) => {
const { session } = await parent();
  if (session) {
    try {
    const programs = await drilltekService.getPrograms(session.accessToken)
    console.log(programs)
    return {
      programs
  }}
  catch(error) {
    console.log(error)
  }
}
  else {
    redirect(302,"/")
  }}

  export const actions = {

    addProgam: async({request}) => {
      
    }

  }
