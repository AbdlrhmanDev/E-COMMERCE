import { createContext, useContext } from "react";

export interface OrderItem {
  productTitle: string;
  quantity: number;
  uniyPrice: number;
}

export interface Order {
  _id: string;
  createdAt: string;
  orderItems: OrderItem[];
  address: string;
  total: number;
}

interface AuthContextType {
  username: string | null;
  token: string | null;
  myOrders: Order[];
  loading: boolean;
  error: string | null;
  
  login: (username: string, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getMyOrders: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  myOrders: [],
  loading: false,
  error: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: () => false,
  getMyOrders: async () => {},
});

export const useAuth = () => useContext(AuthContext);
