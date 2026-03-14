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