import "./css/mainLayout.css"

import { FC } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { routeTitles } from "./routeMap"
import { useAuth } from "../../contexts/AuthContext"
import { Menu } from "../ui/menu/Menu"
import { Button } from "../ui/reusable/button"

export const MainLayout: FC = () => {
    const { getToken, getEmail } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const hasToken = !!getToken()
    const isAdminPage = location.pathname.startsWith("/admin")
    const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/register")
    const hideHeader = isAuthPage || isAdminPage

    return (
        <div className="layout">
            <div className="layout-bg">
                {!hideHeader && (
                    <header className="layout-title-bar">
                        <h1>LOGO</h1>
                        <div className="layout-title">
                            <h4>
                                {routeTitles[location.pathname] || "Загрузка..."}
                            </h4>
                            {getEmail() ?
                                <span>
                                    Профиль: {getEmail()}
                                </span> :
                                <div className="layout-sign-in">
                                    <Button label="Войти" onClick={() => navigate("/login")} />
                                </div>}
                        </div>
                    </header>
                )}

                <main className="layout-content">
                    <div className="layout-outlet">
                        <Outlet />
                    </div>
                </main>

                {hasToken && !isAdminPage && (
                    <Menu />
                )}
            </div>
        </div>
    )
}