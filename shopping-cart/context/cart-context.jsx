import { useReducer } from "react";
import { createContext } from "react";
import { initialState, reducer } from "../src/reducers/reducer";
import { useContext } from "react";


const CartContext = createContext(null)

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}

export const CartProvider = ({children}) => {
    const [state , dispatch] = useReducer(reducer , initialState)
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

