import { useQuery } from "react-query";

import PropTypes from "prop-types";

import ProductCard from "./ProductCard"

import axios from "axios";
import { API_URL } from "../api/config";

const Products = ({ category }) => {

    const { data, isFetching } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/products`);
            const { data } = response;

            return data;
        }
    })
    console.log(category);
    return (
        <div>
            <h2 className="font-extrabold text-xl mt-14">Produtos</h2>
            <p>Selecione um produto para adicionar ao seu pedido</p>

            <div className="flex justify-center gap-x-28 gap-y-10 items-center flex-wrap">
                {(isFetching || !data) ? "Loading..." : category !== 'all'
                    ? data.filter(product => product.name === category).map(
                        product => <ProductCard
                            key={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            description={product.description}
                            price={product.price}
                        />
                    )
                    : data.map(
                        product => <ProductCard
                            key={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            description={product.description}
                            price={product.price}
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
    category: PropTypes.string,
}

export default Products
