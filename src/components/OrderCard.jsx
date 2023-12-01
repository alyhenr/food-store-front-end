import PropTypes from "prop-types";

import { FaWindowClose } from "react-icons/fa"
import { FaRegSquareCheck } from "react-icons/fa6"

const OrderCard = ({ order, updateOrderStatus }) => {

    return (
        <>
            <div className="flex flex-col lg:flex-row justify-start gap-4">
                <img
                    src={order.product.imageUrl}
                    alt={`${order.product.name} picture`}
                    className="w-20 h-20 rounded-xl"
                />
                <div>
                    <h2 className="font-extrabold text-md w-32 overflow-ellipsis">{order.client.code ?? "001"} - {order.client.name}</h2>
                    <p className="text-md font-extralight overflow-ellipsis sm:flex hidden">{order.quantity}x {order.product.name}</p>
                </div>
            </div>
            <div className="flex gap-5 flex-col sm:flex-row">
                <FaWindowClose onClick={() => updateOrderStatus({ id: order.id, status: 'CANCELLED' })}
                    color="red" size={40} className="rounded-lg opacity-80 cursor-pointer hover:scale-[1.05]" />
                <FaRegSquareCheck onClick={() => updateOrderStatus({ id: order.id, status: 'FINISHED' })}
                    color="green" size={40} className="rounded-lg opacity-80 cursor-pointer hover:scale-[1.05]" />
            </div>
        </>
    )
}

OrderCard.propTypes = {
    order: PropTypes.object,
    updateOrderStatus: PropTypes.func
}

export default OrderCard
