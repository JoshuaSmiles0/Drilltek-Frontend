import { dev } from "$app/environment";
import axios from "axios";
import { drilltekService } from "./drilltek-service"
import type { Cookies } from "@sveltejs/kit"

export async function refresh(token:string|null, cookies:Cookies) {
try {
   const newAccess = await drilltekService.refreshToken(token)
   if(newAccess !== null) {
    const cookieVal = cookies.get('drilltekUser') as string
    if(cookieVal) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + newAccess;
        const cookieDetails = JSON.parse(cookieVal);
        cookieDetails['accessToken'] = newAccess
        cookies.set('drilltekUser', JSON.stringify(cookieDetails), {
                             path: "/",
                  httpOnly: true,
                  sameSite: "strict",
                  secure: !dev,
                  maxAge: 60 * 60 * 24 * 7 // one week
                        });
        return true
    }
    else {
        return false
    }}
    else {
        return false
    }}
    catch(error) {
        console.log(error)
        return false
    }}
