import PropTypes from "prop-types";

const SearchBar = ({ search, setSearch }) => {

    return (
        <input
            value={search}
            onChange={ev => setSearch(ev.target.value.toLowerCase())}
            className="w-96 bg-[#f4f4f4] py-2 pl-5 rounded-lg text-[#aaa]"
            placeholder="O que você procura?" />
    )
}

SearchBar.propTypes = {
    search: PropTypes.string,
    setSearch: PropTypes.func,
}

export default SearchBar
