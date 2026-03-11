import { drilltekService } from "$lib/services/drilltek-service";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";





export const load: PageServerLoad = async ({ parent, params }) => {
const { session } = await parent();
  if (session) {
    try {
    const holeid = parseInt(params.holeid)
    const hole = await drilltekService.getDrillholeById(session.accessToken, holeid )
    const lithlog = await drilltekService.getLithLog(session.accessToken, holeid)
    console.log(lithlog)
    return {
      hole,
      lithlog,
      session,
  }}
  catch(error) {
    console.log(error)
  }
}
  else {
    redirect(302,"/logout")
  }}