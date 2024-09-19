import { getSession } from "@/actions/session"
import { redirect } from "next/navigation"

const MapPage = () => {

    const session = await getSession()
    if (!session.isAdmin) {
        redirect('/')
    }
    return (
        <div className="">
            Map page
        </div>
    )
}

export default MapPage