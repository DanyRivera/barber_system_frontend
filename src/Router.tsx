import { BrowserRouter, Routes, Route } from "react-router-dom"
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
            </Routes>
        </BrowserRouter>
    )
}

export default Router
