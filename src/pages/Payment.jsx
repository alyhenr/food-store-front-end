import { useContext, useState } from "react";

import { useMutation, useQuery } from "react-query";
import axios from "axios";

import { FaCreditCard } from "react-icons/fa6";
import { IoCardSharp } from "react-icons/io5";
import { FaMoneyBill } from "react-icons/fa";


import { CartContext } from "../context/CartProvider";

import { API_URL } from "../api/config";
import LargeButton from "../components/ui/LargeButton";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    let clientCode = 1;
    let totalToPay = 0;

    const [clientName, setClientName] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(undefined);

    const { cartContent, setCartContent } = useContext(CartContext);
    const { data } = useQuery({
        queryKey: ['define-client-code'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/clients`);
            const { data } = response;

            return data;
        },
        onSuccess: () => {
            const codes = data.filter(client => !!client.code);
            if (codes.length > 0) {
                clientCode = Math.max(...codes) + 1;
            }
        }
    });

    const navigate = useNavigate();
    const { mutate: makeOrder, isLoading } = useMutation({
        mutationKey: ['make-order'],
        mutationFn: async () => {
            const productsId = Object.keys(cartContent);

            for (let i = 0; i < productsId.length; ++i) {
                const payload = {
                    productId: productsId[i],
                    clientName,
                    quantity: cartContent[productsId[i]].quantity,
                    total: cartContent[productsId[i]].total,
                    observations: cartContent[productsId[i]].observations ?? null,
                    additionals: cartContent[productsId[i]].additionals,
                }

                const response = await axios.post("/orders", payload);
                const { data } = response;

                return data;
            }
        },
        onSuccess: () => { navigate("/takeaway"); setCartContent({}); }
    });

    return (
        <>  <div>
            <div className="flex items-center gap-5 mb-10">
                <FaCreditCard size={25} color="darkgreen" />
                <h1 className="font-black text-3xl">Pagamento</h1>
            </div>
            <div className="flex justify-between">
                <div className="w-[45%] flex flex-col flex-wrap">
                    <p className="font-extrabold text-base">Resumo da compra</p>
                    <div className="mt-5 p-10 w-full h-fit border border-[#aaa] rounded-lg">
                        <ul>
                            {Object.keys(cartContent).length === 0
                                ? "Seu carrinho está vazio"
                                : Object.keys(cartContent).map(productId => {
                                    totalToPay += cartContent[productId].total * cartContent[productId].quantity;
                                    return (
                                        <li key={productId}>
                                            <div className="flex justify-between text-base font-light">
                                                <p>{cartContent[productId].quantity}x {cartContent[productId].name}</p>
                                                <p>R$ {(Number(cartContent[productId].total) / 100).toFixed(2)}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                        </ul>
                        <div className="w-full h-[1px] border border-dashed border-gray-300 my-5"></div>

                        <div className="flex justify-between">
                            <h3>Total do pedido:</h3>
                            <h1 className="text-3xl font-black">R$ {totalToPay > 0 ? (Number(totalToPay) / 100).toFixed(2) : "Carrinho vazio"}</h1>
                        </div>
                    </div>


                    <div className="flex gap-8 flex-wrap">
                        <div className="flex flex-col gap-2 w-[70%]">
                            <label className="mt-5 font-black text-base" htmlFor="clientName">Nome do cliente</label>
                            <input
                                value={clientName}
                                onChange={ev => setClientName(ev.target.value)}
                                id="clientName"
                                name="name"
                                type="text"
                                placeholder="Primeiro nome"
                                className="bg-gray-100 h-10 rounded-xl p-2"
                            />
                            {clientName === "" || clientName?.length < 3 ? <p className="text-red-600">Campo obrigatório (min. 3 caracteres)</p> : null}
                        </div>
                        <div className="flex flex-col gap-2 w-[20%] flex-wrap">
                            <h5 className="mt-5 font-black text-base">Código</h5>
                            <div className="bg-gray-100 h-10 flex items-center rounded-xl pl-5">
                                {isLoading ? "Loading..." : <p>{clientCode}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[40%]">
                    <p className="font-extrabold text-base">Selecione a forma de pagamento:</p>
                    <div className="mt-3 flex flex-col gap-5">
                        <div
                            onClick={() => setPaymentMethod('DEBIT')}
                            className={`${paymentMethod === 'DEBIT' ? " border border-green-800" : ""} w-full h-20 px-10 border border-gray-200 rounded-md flex justify-between items-center cursor-pointer`}>
                            <div className="flex justify-start gap-10 items-center">
                                <IoCardSharp size={25} />
                                <h4>Débito</h4>
                            </div>
                            <input
                                type="radio"
                                className="scale-150 cursor-pointer"
                                checked={paymentMethod === 'DEBIT'}
                                onChange={(ev) => { ev.target.checked = paymentMethod === 'DEBIT'; }}
                            />
                        </div>
                        <div
                            onClick={() => setPaymentMethod('CREDIT')}
                            className={`${paymentMethod === 'CREDIT' ? " border border-green-800" : ""} w-full h-20 px-10 border border-gray-200 rounded-md flex justify-between items-center cursor-pointer`}>
                            <div className="flex justify-start gap-10 items-center">
                                <IoCardSharp size={25} />
                                <h4>Crédito</h4>
                            </div>
                            <input
                                type="radio"
                                className="scale-150 cursor-pointer"
                                checked={paymentMethod === 'CREDIT'}
                                onChange={(ev) => { ev.target.checked = paymentMethod === 'CREDIT'; }}
                            />
                        </div>
                        <div
                            onClick={() => setPaymentMethod('MONEY')}
                            className={`${paymentMethod === 'MONEY' ? " border border-green-800" : ""} w-full h-20 px-10 border border-gray-200 rounded-md flex justify-between items-center cursor-pointer`}>
                            <div className="flex justify-start gap-10 items-center">
                                <FaMoneyBill size={25} />
                                <h4>Dinheiro</h4>
                            </div>
                            <input
                                type="radio"
                                className="scale-150 cursor-pointer"
                                checked={paymentMethod === 'MONEY'}
                                onChange={(ev) => { ev.target.checked = paymentMethod === 'MONEY'; }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
            <div className="flex flex-wrap place-self-end gap-x-8 mt-20">
                <LargeButton
                    onClick={() => { navigate("/"); }}
                    text={"Cancelar"}
                    customstyles={`bg-white border border-[#125c13] text-[#125c13] hover:bg-red-600 hover:text-white hover:border-none`} />
                <LargeButton
                    disabled={!data || isLoading || Object.keys(cartContent).length === 0}
                    onClick={() => makeOrder()}
                    customstyles={`text-white bg-green-900`}
                    text={"Finalizar pedido"} />
            </div>
        </>
    )
}

export default Payment
