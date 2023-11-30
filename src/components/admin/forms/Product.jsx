import { useState } from "react";

import { useMutation, useQuery } from "react-query"
import axios from "axios";

import LargeButton from "../../ui/LargeButton"
import { API_URL } from "../../../api/config";

const Product = () => {
    const [form, setForm] = useState({});
    const [selectedCat, setSelectedCat] = useState(null);

    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories-form'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/categories`);
            const { data } = response;

            return data;
        }
    })

    const { mutate: addProduct } = useMutation({
        mutationKey: ['add-new-product'],
        mutationFn: async (ev) => {
            ev.preventDefault();

            if (!selectedCat) return;

            const payload = { ...form, categoryId: selectedCat };

            const response = await axios.post(`${API_URL}/products`, payload);
            const { data } = response;

            return data;
        },
        onSuccess: () => { setForm({}); setSelectedCat(null); }
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
                    className="h-16 w-[50%] bg-slate-200 rounded-sm p-3" type="text" name="name" id="name" />
            </div>
            <div className="flex flex-col items-start md:flex-row justify-between md:items-center gap-x-10 h-24 w-full">
                <label htmlFor="imageUrl">URL da imagem: </label>
                <input
                    onChange={(ev) => setForm(prev => ({ ...prev, [ev.target.name]: ev.target.value, }))}
                    value={form.imageUrl || ""}
                    className="h-16 w-[50%] bg-slate-200 rounded-sm p-3" type="text" name="imageUrl" id="imageUrl" />
            </div>
            <div className="flex flex-col items-start md:flex-row justify-between md:items-center gap-x-10 h-24 w-full">
                <label htmlFor="description">Descrição: </label>
                <textarea
                    onChange={(ev) => setForm(prev => ({ ...prev, [ev.target.name]: ev.target.value, }))}
                    value={form.description || ""}
                    className="h-20 w-[50%] bg-slate-200 rounded-sm p-3 overflow-y-hidden" type="text" name="description" id="description" />
            </div>
            <div className="flex flex-col items-start md:flex-row justify-between md:items-center gap-x-10 h-24 w-full">
                <label htmlFor="price">Preço: </label>
                <input
                    onChange={(ev) => setForm(prev => ({ ...prev, [ev.target.name]: Number(ev.target.value) * 100, }))}
                    value={form.price || ""}
                    className="h-16 w-[50%] bg-slate-200 rounded-sm p-3" type="text" name="price" id="price" />
            </div>
            {
                isLoading ? "Loading..." : <ul className="place-self-center flex gap-20 flex-wrap m-5">
                    {categories.map(cat => <li
                        onClick={() => { setSelectedCat(cat.id); }}
                        key={cat.id}
                        className={`relative bg-slate-100 p-5 rounded-2xl cursor-pointer ${selectedCat === cat.id ? 'border border-green-600 scale-[1.005]' : ''}`}>
                        <h3>
                            {cat.name}
                        </h3>
                        <img src={cat.imageUrl} alt={`${cat.name} category picture`} className="absolute -bottom-3 -right-3 w-10 object-cover h-10 rounded-full" />
                    </li>)}
                </ul>
            }
            <LargeButton
                customstyles={`place-self-end`}
                text={"Add new Product"}
            />
        </form>
    )
}

export default Product