import { useContext, useState } from "react"
import Categories from "../components/Categories"
import Products from "../components/Products"
import SearchBar from "../components/SearchBar"
import LargeButton from "../components/ui/LargeButton"
import { CartContext } from "../context/CartProvider"
import { useNavigate } from "react-router-dom"

const Orders = () => {
    const [categoryId, setCategoryId] = useState(null);

    const { cartContent, setCartContent } = useContext(CartContext);
    const navigate = useNavigate();
    return (
        <>
            <h1 className="text-4xl font-bold">Seja bem vindo!</h1>
            <SearchBar />
            <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
            <Products categoryId={categoryId} />
            <div className="place-self-start md:place-self-end mt-20 flex flex-wrap gap-x-16 gap-y-10">
                <LargeButton
                    onClick={() => setCartContent({})}
                    text={"Cancelar"}
                    customstyles={`bg-white border border-[#aaa] text-[#aaa] hover:bg-red-600 hover:text-white`} />
                <LargeButton
                    disabled={Object.keys(cartContent).length === 0}
                    onClick={() => navigate("/payment")}
                    customstyles={`text-white`}
                    text={"Finalizar pedido"} />
            </div>
        </>
    )
}

export default Orders
