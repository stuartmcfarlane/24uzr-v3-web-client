"use server"

import { getSession } from "@/actions/session"
import { apiGetMap } from "@/services/api"
import { redirect } from "next/navigation"

const MapPage = async ({
    params
}: {
    params: { id: string }
}) => {
        
    const id = parseInt(params.id)
    const session = await getSession()
    if (!session.isAdmin) {
        redirect('/')
    }
    const map = await apiGetMap(session.apiToken!, id)

    return (
        <div className="">
            Map {map?.name}
        </div>
    )
}
export default MapPage