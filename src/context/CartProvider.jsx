import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cartContent, setCartContent] = useState({});
    // { "productId": {
    //     quantity: Number,
    //     total: Number
    //     observations: String
    //     additionals: String[]
    // }}

    return (
        <CartContext.Provider value={{
            cartContent, setCartContent
        }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.node,
};

export default CartProvider