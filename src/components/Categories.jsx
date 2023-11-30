import CategoryCard from "./CategoryCard"

const Categories = () => {
    return (
        <div>
            <h2 className="font-extrabold text-xl">Categorias</h2>
            <p>Navegue por categoria</p>

            <div className="flex justify-between items-center flex-wrap">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </div>
        </div>
    )
}

export default Categories