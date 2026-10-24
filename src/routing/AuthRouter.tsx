import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import React, { useEffect, useRef } from 'react';
export const AuthRouter: React.FC = () => {
    const {getToken, isLoading, isTokenExpired} = useAuth()
    const navigate = useNavigate()
    const checkedRef = useRef(false)
    useEffect(() => {
        if (checkedRef.current) return
        checkedRef.current = true
        if (getToken() && !isTokenExpired())
            navigate("/", {replace: true})
    }, [])
    if (isLoading) return(
        <>
            <p>Загрузка...</p>
        </>)

    return <Outlet />
}