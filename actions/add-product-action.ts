"use server"
//sever action
import { ErrorResponseSchema, ProductFormSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: string
}
// mapeado con el schema del formulario (validación con next antes de comunicarnos con la API)
export async function addProduct(prevState: ActionStateType, formData: FormData ) {

    // BD
    const product = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        image: formData.get('image'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId'),
    })

    if(!product.success) {
        return {
            errors: product.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    // request API
    const url = `${process.env.API_URL}/products`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product.data)
    })
    const json = await req.json()

    if(!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }

    return {
        errors: [],
        success: 'Producto Agregado Correctamente'
    }
}