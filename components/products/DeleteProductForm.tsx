import { Product } from "@/src/schemas"
import { revalidatePath } from "next/cache"

export default function DeleteProductForm({productId} : {productId: Product['id']}) {

    //server action in line - sin un archivo aparte
    const handleDeleteProduct = async () => {
        "use server"

        const url = `${process.env.API_URL}/products/${productId}`
        const req = await fetch(url, {
            method: 'DELETE'
        })
        console.log(req.ok)
        await req.json()
        revalidatePath('/admin/products')
    }

    return (
        <form
            action={handleDeleteProduct}
        >
            <input
                type="submit"
                className="text-red-600 hover:text-red-800 cursor-pointer"
                value='Eliminar'
            />
        </form>
    )
}
// cuando es componente de servidor puede ser "in line",
// pero si el componente es de cliente, tiene que venir de un archivo aparte.