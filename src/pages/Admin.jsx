import DropDown from "../components/admin/DropDown"
import Additional from "../components/admin/forms/Additional"
import Categorie from "../components/admin/forms/Categorie"
import Client from "../components/admin/forms/Client"
import Product from "../components/admin/forms/Product"

const Admin = () => {
    return (
        <div className="flex flex-col gap-y-10">
            <DropDown title={"Add a new category"}>
                <Categorie />
            </DropDown>
            <DropDown title={"Add a new product"}>
                <Product />
            </DropDown>
            <DropDown title={"Add a new additional"}>
                <Additional />
            </DropDown>
            <DropDown title={"Register a new client"}>
                <Client />
            </DropDown>
        </div>
    )
}

export default Admin