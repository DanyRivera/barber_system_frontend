import { Outlet } from "react-router-dom";

const PublicLayout = () => {

    return (
        <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center relative overflow-hidden">
            <Outlet />
        </div>
    )
}

export default PublicLayout
