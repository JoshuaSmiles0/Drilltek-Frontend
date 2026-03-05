import { drilltekService } from "$lib/services/drilltek-service";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";



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