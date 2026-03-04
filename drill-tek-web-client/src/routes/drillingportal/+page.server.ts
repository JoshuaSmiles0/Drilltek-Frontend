import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { drilltekService } from "$lib/services/drilltek-service";
import { refresh } from "$lib/services/drilltek-utils";
import { error } from "node:console";



export const load: PageServerLoad = async ({ parent, cookies }) => {
const { session } = await parent();
  if (session) {
    try {
    const programs = await drilltekService.getPrograms(session.accessToken)
    console.log(programs)
    return {
      programs
  }}
  catch(error) {
    console.log(error.response.status)
  }
}
  else {
    redirect(302,"/")
  }}
