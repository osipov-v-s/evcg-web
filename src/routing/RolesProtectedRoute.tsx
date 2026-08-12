import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useEffect, useState } from "react"
import { Role } from "../types/account/role"
import { NoResults } from "../components/ui/noResultComponent/NoResult"
import { authApi } from "../services/api/authApi"

interface ApprovedRolesProps {
    approvedRoles : string[]
}

export const RolesProtectedRoute: React.FC<ApprovedRolesProps> = ({approvedRoles} : ApprovedRolesProps) => {
    const {getToken, logout} = useAuth()
    const [userRoles, setUserRoles] = useState<Role[] | undefined>(undefined)

    const navigate = useNavigate()
    useEffect(()=> {
        const getRoles = async (token: string | undefined) => {
            if (!token) {
                logout()
                navigate('/login')
                return
            }
            try {
                const rolesData = await authApi.getRoles(token)
                setUserRoles(rolesData)
                //api for get routes by token
                //after get roles map via them for checking matches
            } catch (err) {
                logout()
                navigate('/login')
            }
        }
        getRoles(getToken())
    }, [getToken, logout, navigate])
    if (!userRoles) {
        return <NoResults variant="loading" message="Проверяем права доступа…" />
    }
    if (!getToken())
        return <Navigate to={'/login'} />
    if (userRoles && userRoles.some(role => approvedRoles.includes(role.name)))
        return <Outlet/>
    else 
        return <Navigate to={'/'} />
    
}
