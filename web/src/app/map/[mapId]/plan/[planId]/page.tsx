"use server"

import { getSession } from "@/actions/session"
import MapPlanPageClientFunctions from "@/components/MapPlanPageFunctions"
import { apiGetBuoys, apiGetMap, apiGetPlan } from "@/services/api"
import { redirect } from "next/navigation"

const MapPlanPage = async ({
    params
}: {
        params: {
            mapId: string,
            planId: string
        }
}) => {

    console.log(params)
    const mapId = parseInt(params.mapId)
    const planId = parseInt(params.planId)
    const session = await getSession()
    const [
        map,
        plan,
        buoys,
    ] = await Promise.all([
        apiGetMap(session.apiToken!, mapId),
        apiGetPlan(session.apiToken!, planId),
        apiGetBuoys(session.apiToken!, mapId),
    ])
    console.log({plan})
    
    if (!map) {
        redirect('/dashboard')
    }
    if (!plan) {
        redirect(`/map/${mapId}`)
    }

    return (
        <MapPlanPageClientFunctions
            map={map}
            plan={plan}
            buoys={buoys || []}
        />
    )
}
export default MapPlanPage