import { drilltekService } from "$lib/services/drilltek-service";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";





export const load: PageServerLoad = async ({ parent , params }) => {
const { session } = await parent();
  if (session) {
    try {
    const drillhole = await drilltekService.getDrillholeById(session.accessToken, parseInt(params.holeid))
    let email = ""
    if('userid' in drillhole){
      const id = drillhole.userid as string
      email = await drilltekService.getUserEmailById(session.accessToken,parseInt(id))
    }
    console.log(drillhole)
    return {
      drillhole,
      session,
      email
  }}
  catch(error) {
    console.log(error)
  }
}
  else {
    redirect(302,"/logout")
  }}
