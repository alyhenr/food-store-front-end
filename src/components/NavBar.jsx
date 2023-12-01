import { Link } from "react-router-dom";

import { IoFastFood } from "react-icons/io5";

const NavBar = () => {
    return (
        <nav className="z-20 fixed top-0 left-0 w-full h-14 bg-[#125c13] flex justify-between p-2 px-12">
            <Link to={"/"}>
                <div className="flex items-center  gap-2">
                    <IoFastFood size={35} color="white" />
                    <h2 className="font-black text-lg text-white mt-1">fastfood</h2>
                </div>
            </Link>
            <div className="flex gap-2.5 text-white font-semibold text-base">
                <Link className="hover:text-slate-200 hover:bg-[#0c400d] rounded-xl px-7 flex items-center" to={"/"}>Pedidos</Link>
                <Link className="hover:text-slate-200 hover:bg-[#0c400d] rounded-xl px-7 flex items-center" to={"/kitchen"}>Cozinha</Link>
                <Link className="hover:text-slate-200 hover:bg-[#0c400d] rounded-xl px-7 flex items-center" to={"/takeaway"}>Retirada</Link>
            </div>
        </nav>
    )
}

export default NavBar
