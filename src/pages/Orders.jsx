import Categories from "../components/Categories"
import Products from "../components/Products"
import SearchBar from "../components/SearchBar"

const Orders = () => {
    return (
        <>
            <h1 className="text-4xl font-bold">Seja bem vindo!</h1>
            <SearchBar />
            <Categories />
            <Products />
        </>
    )
}

export default Orders