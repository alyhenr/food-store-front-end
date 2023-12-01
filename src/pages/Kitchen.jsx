import { useState } from "react";

import axios from "axios";
import { useMutation, useQuery } from "react-query"

import { API_URL } from "../api/config";

import OrderCard from "../components/OrderCard";


const Kitchen = () => {
    const [orders, setOrders] = useState([]);

    const { isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/orders`);

            const { data } = response;

            setOrders(data);
            return data;
        },

    });

    const { mutate: updateOrderStatus } = useMutation({
        mutationKey: ['update-order-status'],
        mutationFn: async ({ id, status }) => {
            setOrders(prev => {
                let updatedOrder;
                const nonUpdatedOrders = prev.filter(order => {
                    if (order.id === id) updatedOrder = order;
                    return order.id !== id
                });
                updatedOrder.status = status;
                setOrders([...nonUpdatedOrders, updatedOrder]);
            })
            const response = await axios.put(`${API_URL}/orders/${id}`, { status });
            const { data } = response;

            return data;
        }
    });
    console.log(orders);
    return (
        (isLoading || !orders) ? "Loading..." :
            <div className="flex flex-col sm:flex-row justify-between sm:items-start items-center py-14">
                <div className="flex flex-col gap-8 w-full sm:w-[45%]">
                    <h1 className="text-3xl font-extrabold">Preparando:</h1>
                    {orders.length > 0 ? <ul className="flex flex-col gap-5">
                        {
                            orders.filter(order => order.status === 'PENDING').map(order => <li key={order.id} className="flex flex-wrap justify-between items-center p-5 gap-5 shadow-md rounded-md">
                                <OrderCard order={order} updateOrderStatus={updateOrderStatus} />
                            </li>)
                        }
                    </ul> : <h3 className="mt-10">Nenhum pedido sendo preparada no momento</h3>}
                </div>
                <div className="w-full h-[1px] my-10 sm:hidden md:flex md:w-[1px] md:h-[70vh] bg-black rounded-lg"></div>
                <div className="flex flex-col gap-8 w-full sm:w-[45%] sm:pl-12 pl-2">
                    <h1 className="text-3xl font-extrabold">Pronto:</h1>
                    {orders.length > 0 ? <ul className="flex flex-col gap-5">
                        {
                            orders.filter(order => order.status === 'FINISHED').map(order => <li key={order.id} className="flex flex-wrap justify-between items-center p-5 gap-5 shadow-md rounded-md border border-green-500">
                                <OrderCard order={order} updateOrderStatus={updateOrderStatus} />
                            </li>)
                        }
                    </ul> : <h3 className="mt-10">Nenhum pedido sendo preparada no momento</h3>}
                </div>
            </div>

    )
}

export default Kitchen
