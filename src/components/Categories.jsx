import { useQuery } from "react-query";

import PropTypes from "prop-types";

import CategoryCard from "./CategoryCard"
import axios from "axios";
import { API_URL } from "../api/config";

const Categories = ({ setCategory }) => {
    const { data, isFetching } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/categories`);
            const { data } = response;

            return data;
        }
    });

    return (
        <div>
            <h2 className="font-extrabold text-xl">Categorias</h2>
            <p>Navegue por categoria</p>

            <div className="flex justify-between items-center flex-wrap">
                {
                    (isFetching || !data) ? "Loading..." : <>
                        {
                            data.map(category => <CategoryCard
                                key={category.id}
                                name={category.name}
                                imageUrl={category.imageUrl}
                                setCategory={() => setCategory(category.name.toLowerCase())}
                            />)
                        }
                    </>
                }
            </div>
        </div>
    )
}

Categories.propTypes = {
    setCategory: PropTypes.func,
}

export default Categories
