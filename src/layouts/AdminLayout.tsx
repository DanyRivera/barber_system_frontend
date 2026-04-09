import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api";
import BarberSystem from "../components/BarberSystem";
import LoadingView from "../views/LoadingView";

//Layout principal
export default function AdminLayout() {

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1
    })

    if (isLoading) return <LoadingView />
    if (isError) return <Navigate to={'/login'} />
    if (user) return <BarberSystem data={user} />;
}


