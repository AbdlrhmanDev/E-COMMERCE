import { createContext, useContext } from "react";
import type { CartItem } from "../../types/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  error: string | null;
  addToCart: (productId: string) => void;
  updateCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    totalPrice: 0,
    error: null,
    updateCart: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: async () => {},
});

export const useCart = () => useContext(CartContext);


