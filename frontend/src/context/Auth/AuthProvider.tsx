import { useState } from "react";
import { AuthContext } from "./AuthContext";    
import { BASE_URL } from "../../constants/baseUrl";
import type { Order } from "./AuthContext";

const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username") || null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
    const [myOrders, setMyOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = (username: string, token: string) => {
        
        setUsername(username);
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
    }

    const logout = () => {
        setUsername(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }   

    const getMyOrders = async () => {
        if (!token) {
            setError("Not authenticated");
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`${BASE_URL}/user/my-orders`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data = await response.json();
            setMyOrders(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    }

    const isAuthenticated = () => {
        return token !== null;
    }

    return (
        <AuthContext.Provider value={{
            username, 
            token, 
            login, 
            logout, 
            isAuthenticated, 
            getMyOrders, 
            myOrders,
            loading,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;




