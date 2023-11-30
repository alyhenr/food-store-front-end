import ProductCard from "./ProductCard"

const Products = () => {
    return (
        <div>
            <h2 className="font-extrabold text-xl mt-14">Produtos</h2>
            <p>Selecione um produto para adicionar ao seu pedido</p>

            <div className="flex justify-center gap-x-28 gap-y-10 items-center flex-wrap">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default Products