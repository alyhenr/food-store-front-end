import PropTypes from "prop-types";

const ProductCard = ({ name, imageUrl, description, price }) => {
    return (
        <div className="w-52 2xl:w-64 h-64 mt-10 shadow-lg rounded-lg flex flex-col justify-between items-center px-3 py-7 text-center hover:shadow-2xl cursor-pointer">
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
        </div>
    )
}

ProductCard.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
};

export default ProductCard