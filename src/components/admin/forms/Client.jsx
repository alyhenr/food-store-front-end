import { useState } from "react";

import { useMutation } from "react-query"
import axios from "axios";

import LargeButton from "../../ui/LargeButton"
import { API_URL } from "../../../api/config";

const Product = () => {
    const [form, setForm] = useState({});

    const { mutate: addProduct, isLoading } = useMutation({
        mutationKey: ['add-new-client'],
        mutationFn: async (ev) => {
            ev.preventDefault();

            const payload = { ...form };

            const response = await axios.post(`${API_URL}/clients`, payload);
            const { data } = response;

            return data;
        },
        onSuccess: () => { setForm({}); }
    });

    return (
        <form
            className="flex flex-col gap-y-3 border border-slate-100 p-3 rounded-lg -mt-8 w-full shadow-md"
            onSubmit={ev => addProduct(ev)}
        >
            <div className="flex flex-col items-start md:flex-row justify-between md:items-center gap-x-10 h-24 w-full">
                <label htmlFor="name">Nome: </label>
                <input
                    onChange={(ev) => setForm(prev => ({ ...prev, [ev.target.name]: ev.target.value, }))}
                    value={form.name || ""}
                    className="h-16 md:w-[50%] bg-slate-200 w-full rounded-sm p-3" type="text" name="name" id="name" />
            </div>
            <LargeButton
                isloading={isLoading}
                customstyles={`place-self-end`}
                text={"Register new Client"}
            />
        </form>
    )
}

export default Product