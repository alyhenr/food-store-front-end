import PropTypes from "prop-types";

const CategoryCard = ({ name, imageUrl, setCategoryId, selected }) => {
    return (
        <div
            onClick={() => setCategoryId()}
            className={`${selected ? 'border border-green-700 scale-[1.05] shadow-2xl p-3' : ''} w-56 h-36 pb-5 mt-10 shadow-md rounded-lg flex flex-col justify-start items-center cursor-pointer hover:opacity-90 hover:shadow-2xl`}>
            <img width="60%" className="h-[65%] object-cover rounded-lg shadow-md" src={imageUrl} alt={`${name} category picture`} />
            <h4 className="mt-5 font-semibold text-lg">{name}</h4>
        </div>
    )
}

CategoryCard.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    selected: PropTypes.bool,
    setCategoryId: PropTypes.func
}

export default CategoryCard