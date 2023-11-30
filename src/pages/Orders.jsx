import { useState } from "react"
import Categories from "../components/Categories"
import Products from "../components/Products"
import SearchBar from "../components/SearchBar"

const Orders = () => {

    const [category, setCategory] = useState("all");

    return (
        <>
            <h1 className="text-4xl font-bold">Seja bem vindo!</h1>
            <SearchBar />
            <Categories setCategory={setCategory} />
            <Products category={category} />
        </>
    )
}

export default Orders
