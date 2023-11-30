import { useState } from "react";

import PropTypes from "prop-types";

import { FaArrowDown } from "react-icons/fa6";


const DropDown = ({ children, title }) => {
    const [showForm, setShowForm] = useState();
    return (
        <>
            <div onClick={() => { setShowForm(prev => !prev); }}
                className="flex flex-col w-full bg-slate-100 h-32 rounded-lg justify-center px-8 cursor-pointer hover:opacity-80 hover:scale-x-[1.01] relative min-w-[300px]">
                <h3 className="font-extrabold text-xl overflow-ellipsis ">{title}</h3>
                <FaArrowDown className="absolute top-[45%] right-16 hidden md:flex" size={25} />
            </div>
            <div className={`${showForm ? 'flex' : 'hidden'}`}>
                {children}
            </div>
        </>
    )
}

DropDown.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
}

export default DropDown
