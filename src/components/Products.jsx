import { useQuery } from "react-query";

import PropTypes from "prop-types";

import ProductCard from "./ProductCard"

import axios from "axios";
import { API_URL } from "../api/config";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

const Products = ({ categoryId, search }) => {

    const { data, isFetching } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/products`);
            const { data } = response;

            return data;
        }
    });

    const { cartContent } = useContext(CartContext);

    return (
        <div>
            <h2 className="font-extrabold text-xl mt-14">Produtos</h2>
            <p>Selecione um produto para adicionar ao seu pedido</p>

            <div className="flex justify-center sm:justify-start gap-x-14 gap-y-10 items-center flex-wrap">
                {(isFetching || !data) ? "Loading..." : categoryId
                    ? data.filter(product => product.categoryId === categoryId).map(
                        product => <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            description={product.description}
                            price={product.price}
                            selected={!!cartContent[product.id]}
                        />
                    )
                    : search.length > 0
                        ? data.filter(product => product.name.toLowerCase().includes(search)).map(
                            product => <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                imageUrl={product.imageUrl}
                                description={product.description}
                                price={product.price}
                                selected={!!cartContent[product.id]}
                            />
                        )
                        : data.map(
                            product => <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                imageUrl={product.imageUrl}
                                description={product.description}
                                price={product.price}
                                selected={!!cartContent[product.id]}
                            />
                        )
                }
                {data && data.length === 0 && <h2 className="font-extrabold text-lg mt-16">
                    There&apos;s no available products right now...
                </h2>}
            </div>
        </div>
    )
}

Products.propTypes = {
    categoryId: PropTypes.string,
    search: PropTypes.string,
}

export default Products
