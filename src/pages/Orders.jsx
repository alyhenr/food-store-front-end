import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useMutation } from "react-query"
import axios from "axios"

import { CartContext } from "../context/CartProvider"
import { ClientContext } from "../context/ClientProvider"

import Categories from "../components/Categories"
import Products from "../components/Products"
import SearchBar from "../components/SearchBar"
import LargeButton from "../components/ui/LargeButton"
import { API_URL } from "../api/config"

const Orders = () => {
    const [categoryId, setCategoryId] = useState(null);
    const [search, setSearch] = useState("");

    const { cartContent, setCartContent } = useContext(CartContext);
    const { client } = useContext(ClientContext);
    const navigate = useNavigate();

    const { isLoading } = useMutation({
        mutationKey: ['create-order'],
        mutationFn: async () => {

            const productsId = Object.keys(cartContent);

            const responses = [];
            for (let i = 0; i < productsId.length; ++i) {
                const payload = { ...cartContent[productsId], clientId: client.id }
                const { data } = await axios.post(`${API_URL}/orders`, payload);

                responses.push(data);
            }
            return responses;
        }
    });

    return (
        <>
            <h1 className="text-4xl font-bold">Seja bem vindo!</h1>
            <SearchBar search={search} setSearch={setSearch} />
            <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
            <Products categoryId={categoryId} search={search} />
            <div className="place-self-start md:place-self-end mt-20 flex justify-center sm:justify-start flex-wrap gap-x-16 gap-y-10">
                <LargeButton
                    onClick={() => setCartContent({})}
                    text={"Cancelar"}
                    customstyles={`bg-white border border-[#aaa] text-[#aaa] hover:bg-red-600 hover:text-white`} />
                <LargeButton
                    disabled={isLoading || Object.keys(cartContent).length === 0}
                    onClick={() => navigate("/payment")}
                    customstyles={`text-white`}
                    text={"Finalizar pedido"} />
            </div>
        </>
    )
}

export default Orders
