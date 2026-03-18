import { drilltekService } from '$lib/services/drilltek-service.js';
import axios from 'axios';
import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent, cookies }) => {
    const { session } = await parent();
  if (session) {
    const response = await drilltekService.backlistToken(session.accessToken, session.refreshToken)
    if(response === 200) {
    delete axios.defaults.headers.common['Authorization'];
    cookies.delete("drilltekUser",{path:"/"});
    }
    else {
        redirect(302,"/mainportal")
    }
};
}