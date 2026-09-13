import "./css/layoutStyle.css"
import { FC, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Menu } from "../ui/menu/Menu"
import { useAuth } from "../../contexts/AuthContext"
import { routeTitles } from "./routeMap"
import { MenuIcon } from "lucide-react"
import { Sidebar } from "../ui/menu/Sidebar"
import { Button } from "../ui/reusable/button"

export const Layout: FC = () => {
    const { getToken, getEmail } = useAuth()
    const location = useLocation()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isHomeNavOpen, setIsHomeNavOpen] = useState(false)

    const isAuthPage = location.pathname === "/login" || location.pathname.startsWith("/register")
    const isAdminPage = location.pathname.startsWith("/admin")
    const isHomePage = location.pathname === "/"
    const shouldHideHeader = isAuthPage || isAdminPage
    const hasToken = !!getToken()

    const navigate = useNavigate()

    const homeNavigation = [
        { label: "О проекте", href: "#about" },
        { label: "Как это работает", href: "#how-it-works" },
        { label: "Инженерные профессии", href: "#professions" },
        { label: "Наши победы", href: "#achievements" },
        { label: "Где используется", href: "#organizations" },
        { label: "Команда", href: "#team" },
        { label: "Наука", href: "#science" },
    ]

    return (
        <div className={`layout-wrapper ${isHomePage ? "layout-wrapper--public" : ""} ${isAuthPage ? "layout-wrapper--auth" : ""}`}>
            <div className="background" />

            {!shouldHideHeader && (
                isHomePage ? (
                    <header className="public-home-header">
                        <button className="public-home-brand" type="button" onClick={() => navigate("/")} aria-label="ПрофиВектор — на главную">
                            <span className="public-home-brand-mark">ПВ</span>
                            <span><strong>ПрофиВектор</strong><small>Инженерная профориентация</small></span>
                        </button>

                        <nav className={`public-home-nav ${isHomeNavOpen ? "public-home-nav--open" : ""}`} aria-label="Навигация по главной странице">
                            {homeNavigation.map((item) => (
                                <a key={item.href} href={item.href} onClick={() => setIsHomeNavOpen(false)}>{item.label}</a>
                            ))}
                            <div className="public-home-nav-actions">
                                {!hasToken ? (
                                    <>
                                        <Button variant="tertiary" label="Войти" onClick={() => navigate("/login")} />
                                        <Button label="Начать бесплатно" onClick={() => navigate("/register")} />
                                    </>
                                ) : (
                                    <>
                                        <Button variant="tertiary" label="Профиль" onClick={() => navigate("/profile")} />
                                        <Button label="Продолжить" onClick={() => navigate("/tests")} />
                                    </>
                                )}
                            </div>
                        </nav>

                        <button
                            className="public-home-menu-button"
                            type="button"
                            aria-label={isHomeNavOpen ? "Закрыть меню" : "Открыть меню"}
                            aria-expanded={isHomeNavOpen}
                            onClick={() => setIsHomeNavOpen((isOpen) => !isOpen)}>
                            <MenuIcon />
                        </button>
                    </header>
                ) : (
                    <header className="header">
                        <div className="header-title">
                            <h4>{routeTitles[location.pathname] || "Загрузка..."}</h4>
                            {!getEmail() &&
                                <Button label="Войти" onClick={() => navigate("/login")} />}
                        </div>

                        {getEmail() &&
                            <span>Профиль: {getEmail()} </span>
                        }

                        {hasToken && (
                            <button className="sidebar-button" type="button" aria-label="Открыть меню" onClick={() => setIsSidebarOpen(true)}>
                                <MenuIcon />
                            </button>
                        )}
                    </header>
                )
            )}

            <div className="outlet">
                <Outlet />
            </div>

            {hasToken && !isAdminPage && !isHomePage && (
                <div className="menu">
                    <Menu />
                </div>
            )}

            {hasToken && !isHomePage && (
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
            )}
        </div>
    )
}
