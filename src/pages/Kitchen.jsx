import axios from "axios";
import { useQuery } from "react-query"
import { API_URL } from "../api/config";

const Kitchen = () => {

    const { data: orders, isLoading } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/orders`);

            const { data } = response;
            return data;
        },
    });
    console.log(orders);
    return (
        isLoading ? "Loading..." :
            <div className="flex justify-between items-start py-14">
                <div className="flex flex-col w-[45%]">
                    <h1 className="text-3xl font-extrabold">Preparando:</h1>
                    <ul>
                    </ul>
                </div>
                <div className="w-[1px] h-[70vh] bg-black rounded-lg"></div>
                <div className="flex flex-col gap-8 w-[45%] pl-12">
                    <h1 className="text-3xl font-extrabold">Pronto:</h1>
                </div>
            </div>

    )
}

export default Kitchen
