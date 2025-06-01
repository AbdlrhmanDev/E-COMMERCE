/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState,useEffect } from "react";
import { CartContext } from "./CartContext";    
import type { CartItem } from "../../types/CartItem";
import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/baseUrl";

const CartProvider: React.FC<{children: React.ReactNode}> = ({children}): React.ReactElement => {
    const {token} = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [error, setError] = useState('');


    useEffect(() => {
        if (!token) {
        console.warn("No token found, not fetching cart.");
        return;
        }
        const fetchCartItems = async () => {
        if(!token){
            setError("No token found, not fetching cart.");
            return;
    }
        try {

            const response = await fetch(`${BASE_URL}/cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });
            if (!response.ok) {
            setError("Failed to fetch cart items");
            return;
            }

            const cart = await response.json();
            const cartItemsMap = cart.items.map(({product, quantity, unitPrice}: {product: any, quantity: number, unitPrice: number}) => ({
                _id: product._id,
                productId: product._id,
                name: product.name,
                image: product.image,
                product: product,
                quantity,
                unitPrice: unitPrice,
            }));
            setCartItems(cartItemsMap);
            setTotalPrice(cart.totalPrice);
        } catch (err) {
            setError("Failed to fetch cart items" + err);
        }
        };
        fetchCartItems();
    }, [token]);


const updateCart = async (productId: string, quantity: number): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/cart/items`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({productId, quantity}),
        });
        if (!response.ok) {
            setError('Failed to update cart item');
            return;
        }
        const cart = await response.json();
        const cartItemsMap = cart.items.map(({product, quantity, unitPrice}: {product: any, quantity: number, unitPrice: number}) => ({
            _id: product._id,
            productId: product._id,
            name: product.name,
            image: product.image,
            product: product,
            quantity,
            unitPrice: unitPrice,
        }));
        setCartItems(cartItemsMap);
        setTotalPrice(cart.totalPrice);
    } catch (error) {
        console.error('Error updating cart:', error);
    }
};


    const addToCart = async (productId: string): Promise<void> => {
        try {
            const response = await fetch('http://localhost:3000/cart/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId, quantity: 1 }),
            });
            if (!response.ok) {
               setError('Failed to add product to cart');
            }
            
            const cart = await response.json();
            if(!cart){
                setError('Failed to add product to cart');
            }
            const cartItemsMap = cart.items.map(({product, quantity, unitPrice}: {product: any, quantity: number, unitPrice: number}) => ({
                _id: product._id,
                productId: product._id,
                name: product.name,
                image: product.image,
                product: product,
                quantity,
                unitPrice: unitPrice,
            }));




            setCartItems([...cartItemsMap]);
            // Update total price when adding item

            setTotalPrice(cart.totalPrice);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


    const removeFromCart = async (productId: string): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); 
            if (!response.ok) {
                setError('Failed to remove product from cart');
                return;
            }
            // Fetch the updated cart after deletion
            const cart = await response.json();
            const cartItemsMap = cart.items.map(({product, quantity, unitPrice}: {product: any, quantity: number, unitPrice: number}) => ({
                _id: product._id,
                productId: product._id,
                name: product.name,
                image: product.image,
                product: product,
                quantity,
                unitPrice: unitPrice,
            }));
            setCartItems(cartItemsMap);
            setTotalPrice(cart.totalPrice);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };




 const clearCart = async (): Promise<void> => {
    try {
        const response = await fetch(`${BASE_URL}/cart`, {
            method: 'DELETE',
            headers: {
                
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            setError('Failed to clear cart');
            return;
        }
        setCartItems([]);
        setTotalPrice(0);
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
};

    
    
    return (
        <CartContext.Provider value={{cartItems, totalPrice, error, addToCart, updateCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;




