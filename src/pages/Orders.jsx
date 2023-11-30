import { useState } from "react"
import Categories from "../components/Categories"
import Products from "../components/Products"
import SearchBar from "../components/SearchBar"
import LargeButton from "../components/ui/LargeButton"

const Orders = () => {

    const [category, setCategory] = useState("all");

    return (
        <>
            <h1 className="text-4xl font-bold">Seja bem vindo!</h1>
            <SearchBar />
            <Categories setCategory={setCategory} />
            <Products category={category} />
            <div className="place-self-end mt-20 flex gap-x-16">
                <LargeButton text={"Cancelar"} customstyles={`bg-white border border-[#aaa] text-[#aaaaaa] hover:bg-red-600 hover:text-white`} />
                <LargeButton text={"Finalizar pedido"} />
            </div>
        </>
    )
}

export default Orders
