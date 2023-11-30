import PropTypes from "prop-types";

const CategoryCard = ({ name, imageUrl, setCategory }) => {
    return (
        <div
            onClick={() => setCategory()}
            className="w-64 h-40 mt-10 shadow-lg rounded-lg flex flex-col justify-start items-center cursor-pointer hover:opacity-90 hover:shadow-2xl">
            <img width="70%" className="h-[65%] object-cover rounded-lg shadow-md" src={imageUrl} alt={`${name} category picture`} />
            <h4 className="mt-5 font-semibold text-lg">{name}</h4>
        </div>
    )
}

CategoryCard.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    setCategory: PropTypes.func
}

export default CategoryCard