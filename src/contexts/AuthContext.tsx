// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import Cookies from "js-cookie"
import { Role } from '../types/account/role';
import {jwtDecode} from "jwt-decode"
interface AuthContextType {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  getToken: () => string;
  setRoles: (roles: Role[]) => void;
  getRoles: () => Role[] | undefined;
  checkRole: (role: Role) => boolean | undefined
  isFirstLogin: () => boolean
  getEmail: () => string
  isTokenExpired: () => boolean
}
interface TokenClaims {
  email: string
  firstLogin: boolean
  sub: string
  exp: number
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("roles");
    setToken(null);
  };

  const login = (token: string) => {
    // Убираем префикс "Bearer " если он есть
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    Cookies.set("token", cleanToken, {
      expires: 1,
      secure: false,
      sameSite: "strict"
    });
        
    setToken(cleanToken);
  };

  const getToken = (): string => {

    const token = Cookies.get("token")
    //if (!token) throw new Error("Auth token is empty")
    return token || "";

    
  };
  const getTokenClaims = () => {
    try {
      return jwtDecode(getToken().replace("Bearer ", "")) as TokenClaims
    } catch(err) {
      return null
    }
  }

  const setRoles = (roles: Role[]) => {
    Cookies.set("roles", JSON.stringify(roles), {
      expires: 12,
      secure: false,
      sameSite: "strict"
    });
  };

  const getRoles = (): Role[] | undefined => {
    const rolesCookie = Cookies.get("roles");
    if (!rolesCookie) return undefined;
    try {
      return JSON.parse(rolesCookie)
    } catch (err) {
      return undefined;
    }
  }
  const checkRole = (role:Role) : boolean => {
    const roles = getRoles()
    return !!roles?.some(r => r.name === role.name)
  }
  const isFirstLogin = () => getTokenClaims()?.firstLogin || false
  const getEmail = () => getTokenClaims()?.email || ""
  const isTokenExpired = () : boolean => {
    const token = Cookies.get("token")
    if (!token) return true
    try {
      const expireDate = getTokenClaims()?.exp
      if (!expireDate) return true
      const currentTime = Date.now() / 1000
      return expireDate < currentTime
    } catch(err) {
      return true
    }
  }

  return (
    <AuthContext.Provider value={{token, isLoading, login, logout, getToken, getRoles, setRoles, checkRole, isFirstLogin, getEmail, isTokenExpired}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	
	return context
}
