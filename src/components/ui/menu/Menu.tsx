import "./css/menuStyles.css"

import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { FC, useCallback, useEffect, useMemo, useRef } from "react"
import { logoutButton, menuButtons, MenuItemProps } from "./optionsData"
import { useInteractiveStore } from "./store"

interface ItemProps {
    item: MenuItemProps
    isActive: boolean
    isInteractive: boolean
    onClick: (item: MenuItemProps) => void
}

const MenuItem: FC<ItemProps> = ({ item, isActive, onClick, isInteractive }) => {
    const Icon = item.icon
    if (item.isLogout) isInteractive = true
    return (
        <button type="button" 
            className={`menu-nav-item-container ${item.className || ""} ${isActive ? "active" : ""} ${!isInteractive ? 'blocked' : ''}`} 
            onClick={() => onClick(item)}>
            <div className="menu-nav-item-icon"><Icon /></div>
            <div className="menu-nav-item-label">{item.label}</div>
        </button>
    )
}

export const Menu = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { logout, checkRole } = useAuth()
    const scrollRef = useRef<HTMLDivElement>(null)
    const isInteractive = useInteractiveStore((state) => state.isInteractive)
    useEffect(() => {
        const el = scrollRef.current
        if (!el)
            return

        const onWheel = (e: WheelEvent) => {
            if (e.deltaY === 0)
                return

            e.preventDefault()

            el.scrollTo({
                left: el.scrollLeft + e.deltaY,
                behavior: "smooth",
            })
        }

        el.addEventListener("wheel", onWheel, { passive: false })
        return () => el.removeEventListener("wheel", onWheel)
    }, [])

    const isActive = useCallback((path: string) =>
        pathname === path || (path !== "/" && pathname.startsWith(`${path}/`)),
        [pathname])

    const handleAction = useCallback((item: MenuItemProps) => {
        if (item.isLogout) {
            logout?.()
        }
        navigate(item.path)
    }, [logout, navigate])

    const menuItems = useMemo(() => {
        return [...menuButtons, logoutButton]
            .filter(btn => !btn.allowedRoles?.length || btn.allowedRoles.some(r => checkRole({ name: r })))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
    }, [checkRole])

    return (
        <div className="menu-wrapper">
            <nav className='menu-nav'  ref={scrollRef}>
                {menuItems.map(item => (
                    <MenuItem
                        key={item.id}
                        item={item}
                        isActive={isActive(item.path)}
                        isInteractive={isInteractive}
                        onClick={handleAction} />
                ))}
            </nav>
        </div>
    )
}
