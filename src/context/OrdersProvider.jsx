import { createContext, useState } from "react";

import PropTypes from "prop-types";
import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../api/config";

export const OrdersContext = createContext([]);

const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/orders`);
            const { data } = response;

            setOrders(data);
            return data;
        },
    });

    return (
        <OrdersContext.Provider value={{ orders, setOrders }}>
            {children}
        </OrdersContext.Provider>
    )
}

OrdersProvider.propTypes = {
    children: PropTypes.node,
}

export default OrdersProvider
