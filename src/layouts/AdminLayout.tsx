import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getUser } from "../api";
import BarberSystem from "../components/BarberSystem";
import LoadingView from "../views/LoadingView";

//Layout principal
export default function AdminLayout() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1
    })

    if (isLoading) return <LoadingView />
    if (isError) return <Navigate to={'/login'} />
    if(data) return <BarberSystem data={data} />;
}


