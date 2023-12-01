import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const OrderFinishModal = () => {
    const navigate = useNavigate();
    return (
        <div className="z-30 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-max-[600px] w-[40%] h-[450px]">
                <div className="bg-white h-[100%] rounded-lg relative flex flex-col">
                    <IoClose className="absolute top-5 right-5 cursor-pointer" size={30} onClick={() => navigate("/takeaway")} />
                    <div className="flex flex-col justify-start items-center w-full h-full gap-2">
                        <img
                            className="w-[50%] h-[70%] object-contain rounded-lg  backdrop-filter fill-neutral-400"
                            src="https://i.pinimg.com/736x/5a/e3/f4/5ae3f4c42ce0aa35920dbaba52dbb8d5.jpg"
                            alt="happy man with food"
                        />
                        <h1 className="text-3xl font-black">Pedido finalizado com sucesso!</h1>
                        <p className="text-md mt-2">O pedido foi encaminhado para a cozinha.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderFinishModal
