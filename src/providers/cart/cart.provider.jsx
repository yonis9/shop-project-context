import React, { useState, useEffect, createContext } from 'react';

import { 
    addItemToCart,
    filteCartAfterClear, 
    removeItemFromCart,
    getTotalQuantity,
    getTotalPrice
} from './cart.utils'

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount:0,
    total: 0
})



const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const toggleHidden = () => setHidden(!hidden) ;
    const [cartItems, setCartItems] = useState([]);
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const clearItemFromCart = item => setCartItems(filteCartAfterClear(cartItems, item))
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setCartItemsCount(getTotalQuantity(cartItems));
        setTotal(getTotalPrice(cartItems))
    }, [cartItems])

    return (
        <CartContext.Provider value={{
            hidden,
            toggleHidden,
            cartItems,
            addItem,
            removeItem,
            clearItemFromCart,
            cartItemsCount,
            total
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;