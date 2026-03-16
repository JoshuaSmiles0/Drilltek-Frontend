import { dev } from "$app/environment";
import axios from "axios";
import { drilltekService } from "./drilltek-service"
import type { Cookies } from "@sveltejs/kit"
import type { AddLithLog,  Session } from "$lib/types/drilltek-types";

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
        return cookieDetails as Session
    }
    else {
        return null
    }}
    else {
        return null
    }}
    catch(error) {
        console.log(error)
        return null
    }}

export function setLithType(lithlog:AddLithLog[]) {
    lithlog.forEach(log => {
        const code = log.lithcode
        switch(code) {
            case "W_Bm":
                log.lithology = "waulsortian biomicrite";
                break;
            case "W_Dol":
                log.lithology = "Dolomitised Reef";
                break;
            case "W_WL":
                log.lithology = "Wavy Laminated Facies";
                break;
            case "W_LTU":
                log.lithology = "Lower Transition Unit";
                break;
            case "W_Lll":
                log.lithology = "Lower Limestone Lens";
                break;
            case "ABL_Nm":
                log.lithology = "Nodular Micrite Unit";
                break;
            case "ABL_En":
                log.lithology = "ABL Encrinite";
                break;
            case "ABL":
                log.lithology = "Undifferentiated ABL";
                break;
            case "ABL_Uppr":
                log.lithology = "Upper ABL";
                break;
            case "ABL_Lwr":
                log.lithology = "ABL Lower";
                break;
            case "OOL":
                log.lithology = "Lisduff oolite undiff";
                break;
            case "OOL_Uppr":
                log.lithology = "Upper Lisduff Ool";
                break;
            case "OOL_Mid":
                log.lithology = "Middle Lisduff Ool";
                break;
            case "OOL_Lwr":
                log.lithology = "Lower Lisduff Ool";
                break;
            case "SLT":
                log.lithology = "Undifferentiated Siltite";
                break;
            case "MU":
                log.lithology = "Undifferenciated Micrite";
                break;
            case "ARG":
                log.lithology = "Undifferenciated Argillite";
                break;
            case "GSTN":
                log.lithology = "Undifferenciated Grainstone";
                break;
            case "DOL":
                log.lithology = "Undifferenciated Dolomite";
                break;
            case "BDOL":
                log.lithology = "Undifferenciated Black Dolomite";
                break;
            case "LST":
                log.lithology = "Undifferenciated Limestone";
                break;
        }
    })
    return lithlog as AddLithLog[]
}


