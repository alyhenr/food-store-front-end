import { useContext } from "react";

import { OrdersContext } from "../context/OrdersProvider";

const TakeAway = () => {
    const { orders } = useContext(OrdersContext);
    return (
        !orders ? "Loading..." : <div className="flex flex-col sm:flex-row justify-between sm:items-start items-center py-14">
            <div className="flex flex-col gap-8 w-full sm:w-[45%]">
                <h1 className="text-[48px] font-extrabold">Preparando:</h1>
                {orders.length > 0 ? <ul className="flex flex-col gap-5">
                    {
                        orders.filter(order => order.status === 'PENDING').map(order => <li key={order.id} className="flex flex-wrap justify-between items-center p-5 gap-3 rounded-md">
                            <h1 className="text-[56px] font-black text-gray-400">{order.client.name}</h1>
                        </li>)
                    }
                </ul> : <h3 className="mt-10">Nenhum pedido sendo preparado no momento</h3>}
            </div>
            <div className="w-full h-[5px] my-10 sm:hidden md:flex md:w-[5px] md:h-[70vh] bg-black rounded-lg"></div>
            <div className="flex flex-col gap-8 w-full sm:w-[45%] sm:pl-20 pl-2">
                <h1 className="text-[48px] font-extrabold">Pronto:</h1>
                {orders.length > 0 ? <ul className="flex flex-col gap-5">
                    {
                        orders.filter(order => order.status === 'FINISHED').map(order => <li key={order.id} className="flex flex-wrap justify-between items-center p-5 gap-3 rounded-md">
                            <h1 className="text-[56px] font-black text-green-900">{order.client.name}</h1>
                        </li>)
                    }
                </ul> : <h3 className="mt-10">Nenhum pedido pronto no momento</h3>}
            </div>
        </div>
    )
}

export default TakeAway