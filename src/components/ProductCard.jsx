import { useState } from "react";

import PropTypes from "prop-types";

import ProductInfo from "./ProductInfo";

import { FaCheck } from "react-icons/fa";

const ProductCard = ({ id, name, imageUrl, description, price, selected }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <div
                onClick={() => setShowInfo(true)}
                className="w-56 h-72 mt-10 shadow-lg rounded-lg flex flex-col justify-between items-center px-3 py-7 text-center hover:shadow-2xl cursor-pointer relative">
                <img
                    className="w-[55%] object-cover rounded-lg"
                    src={imageUrl}
                    alt={`${name} picture`}
                />
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="font-extralight text-sm overflow-ellipsis">{description}</p>
                </div>
                <h4 className="font-extrabold text-lg">R${(price / 100).toFixed(2)}</h4>
                <div className={`${selected ? 'flex' : 'hidden'} flex-col absolute inset-0 opacity-70 w-56 h-72 bg-green-600 rounded-lg justify-center items-center hover:opacity-90`}>
                    <FaCheck color="white" size={45} />
                </div>
            </div>
            {showInfo ? <ProductInfo closeModal={() => setShowInfo(false)} product={{ id, name, imageUrl, description, price }} /> : null}
        </>
    )
}

ProductCard.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    selected: PropTypes.bool,
};

export default ProductCard