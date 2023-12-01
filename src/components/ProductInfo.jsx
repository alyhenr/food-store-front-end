import { useState } from "react";

import PropTypes from "prop-types";

import { IoClose } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import LargeButton from "./ui/LargeButton";
import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../api/config";

const ProductInfo = ({ closeModal, product: { id, name, imageUrl, description, price } }) => {
    const [quantity, setQuantity] = useState(1);
    const [additionals, setAdditionals] = useState(new Set());
    const [total, setTotal] = useState(price);

    const { data, isLoading } = useQuery({
        queryKey: [`additionals-product-info-${id}`],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/additionals`);
            const { data } = response;

            return data;
        }
    });

    return (
        <div className="z-30 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-max-[600px] w-[70%]">
                <div className="bg-white h-full rounded-lg relative flex flex-col">
                    <IoClose className="absolute top-5 right-5 cursor-pointer" size={30} onClick={() => closeModal()} />
                    <div className="flex flex-col px-28 py-12 gap-y-3 items-start">
                        <h1 className="font-extrabold text-2xl">Revise seu pedido!</h1>
                        <div className="flex justify-between w-full p-5">
                            <div className="flex gap-12">
                                <div className="w-56 h-56 mt-10 shadow-lg rounded-lg flex flex-col justify-between items-center px-3 py-7 text-center hover:shadow-2xl">
                                    <img src={imageUrl} alt={`${name} picture`} className="w-40 rounded-xl" />
                                </div>
                                <div>
                                    <h2 className="font-extrabold text-xl">{name}</h2>
                                    <p className="font-light mt-2">{description}</p>

                                    <div className="flex items-center justify-center w-24 mt-5 border-y-2 border-green-900 bg-slate-50 h-10 relative">
                                        <FaCircleMinus
                                            onClick={() => { setQuantity(prev => prev > 0 ? prev - 1 : 0); }}
                                            className="cursor-pointer absolute -top-[3px] -left-3.5" color="darkgreen" size={42} />
                                        <h3 className="text-center">{quantity}</h3>
                                        <FaCirclePlus
                                            onClick={() => { setQuantity(prev => prev + 1); }}
                                            className="cursor-pointer absolute -top-[3px] -right-3.5" color="darkgreen" size={42} />
                                    </div>
                                </div>
                            </div>
                            <h2 className="font-extrabold text-xl">R${Number(total * quantity / 100).toFixed(2)}</h2>
                        </div>

                        <div className="mt-10 w-full px-8">
                            <h2 className="text-lg font-extrabold">Adicionais</h2>
                            <p className="font-light text-base">
                                Selecione os ingredientes que você quer adicionar a mais no seu lanche.
                            </p>
                            {isLoading ? "Loading..." : data?.length === 0
                                ? "Nenhum adicional disponivel para esse produto..."
                                : <ul className="mt-8 flex flex-col w-full">
                                    {data.map(additional => <li key={additional.id} className="flex justify-between">
                                        <div className="flex gap-5">
                                            <img
                                                src={additional.imageUrl}
                                                alt={`${additional.name} picture`}
                                                className="w-20 h-16 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="font-bold text-lg">{additional.name}</h3>
                                                <p>{additional.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-12 items-center">
                                            <h4 className="text-[#aaa] text-lg">R${(Number(additional.price) / 100).toFixed(2)}</h4>
                                            <input
                                                type="radio"
                                                className="scale-150 cursor-pointer"
                                                onClick={() => setAdditionals(prev => {
                                                    const curr = new Set(prev);
                                                    if (curr.has(additional.id)) {
                                                        curr.delete(additional.id);
                                                        setTotal(prev => Math.max(prev - Number(additional.price), 0));
                                                    }
                                                    else {
                                                        curr.add(additional.id);
                                                        setTotal(prev => prev + Number(additional.price));
                                                    }
                                                    return curr;
                                                })}
                                                onChange={(ev) => { ev.target.checked = additionals.has(additional.id); }}
                                                checked={additionals.has(additional.id)}
                                            />
                                        </div>
                                    </li>)}
                                </ul>
                            }
                        </div>
                        <div className="mt-10 w-full rounded-lg">
                            <h2 className="text-lg font-extrabold mb-2">Observações</h2>
                            <input type="text" placeholder="Adicione uma observação ao pedido" className="h-28 w-full bg-gray-100 rounded-lg text-start flex items-start relative placeholder:absolute placeholder:top-4 placeholder:left-4" />

                        </div>
                        <div className="md:place-self-end flex md:flex-row gap-10 mt-12 flex-col items-center w-full">
                            <LargeButton isloading={isLoading} text={"Continuar adicionando"} customstyles={`bg-white border border-green-900 text-green-900 hover:text-white`} />
                            <LargeButton isloading={isLoading} text={"Adicionar ao pedido"} customstyles={`bg-green-900 border border-green-900 text-white`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ProductInfo.propTypes = {
    closeModal: PropTypes.func,
    product: PropTypes.object,
}

export default ProductInfo
