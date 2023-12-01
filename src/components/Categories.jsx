import { useQuery } from "react-query";

import PropTypes from "prop-types";

import CategoryCard from "./CategoryCard"
import axios from "axios";
import { API_URL } from "../api/config";

const Categories = ({ categoryId, setCategoryId }) => {
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

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-x-14 items-center flex-wrap">
                {
                    (isFetching || !data) ? <h1 className="text-3xl font-black text-black">
                        Os dados estão chegando! Se essa for a sua primeira vez acessando esse aplicativo, pode demorar alguns minutos... O banco de dados está hospedado em um serviço gratuito, obrigado!
                    </h1> : <>
                        {
                            data.map(category => <CategoryCard
                                key={category.id}
                                name={category.name}
                                imageUrl={category.imageUrl}
                                setCategoryId={() => setCategoryId(prev => prev === category.id ? null : category.id)}
                                selected={category.id === categoryId}
                            />)
                        }
                    </>
                }
            </div>
        </div>
    )
}

Categories.propTypes = {
    setCategoryId: PropTypes.func,
    categoryId: PropTypes.string,
}

export default Categories
