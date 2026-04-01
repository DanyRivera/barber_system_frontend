import { BrowserRouter, Routes, Route } from "react-router-dom"

import AdminLayout from "./layouts/AdminLayout"

import LoginView from "./views/LoginView"
import RegistroView from "./views/RegistroView"
import HomeView from "./views/HomeView"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/registro" element={<RegistroView />} />
                <Route path="/login" element={<LoginView />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="citas" element={<HomeView />} />
                    <Route path="agendar" element={<LoginView />} />
                    <Route path="clientes" element={<RegistroView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
