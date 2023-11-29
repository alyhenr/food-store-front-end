import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full h-14 bg-[#125c13] flex justify-between p-2 px-12">
            <div>
                LOGO
            </div>
            <div className="flex gap-2.5 text-white font-semibold text-base">
                <Link className="hover:text-slate-200 hover:bg-[#0c400d] rounded-xl px-7 flex items-center" to={"/"}>Pedidos</Link>
                <Link className="hover:text-slate-200 hover:bg-[#0c400d] rounded-xl px-7 flex items-center" to={"/kitchen"}>Cozinha</Link>
                <Link className="hover:text-slate-200 hover:bg-[#0c400d] rounded-xl px-7 flex items-center" to={"/takeaway"}>Retirada</Link>
            </div>
        </nav>
    )
}

export default NavBar
