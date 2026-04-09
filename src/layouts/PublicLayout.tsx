import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

import { getUser } from "../api";
import LoadingView from "../views/LoadingView";


const PublicLayout = () => {

    const { isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1
    })


    if (isLoading) return <LoadingView />
    if (!isError) return <Navigate to={'/admin/citas'} />
    return (
        <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center relative overflow-hidden">
            <Outlet />
        </div>
    )
}

export default PublicLayout
