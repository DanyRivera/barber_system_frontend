import { BrowserRouter, Routes, Route } from "react-router-dom"

import AdminLayout from "./layouts/AdminLayout"

import LoginView from "./views/LoginView"
import RegistroView from "./views/RegistroView"
import HomeView from "./views/HomeView"
import CitasView from "./views/CitasView"
import AgendarView from "./views/AgendarView"
import ProfileView from "./views/ProfileView"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/registro" element={<RegistroView />} />
                <Route path="/login" element={<LoginView />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="citas" element={<CitasView />} />
                    <Route path="agendar" element={<AgendarView />} />
                    <Route path="profile" element={<ProfileView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
