"use server"

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/src/schemas"
import { revalidatePath, revalidateTag } from "next/cache"



export async function submitOrder(data: unknown) {
    const order = OrderSchema.parse(data) // validación con zod
    const url = `${process.env.API_URL}/transactions`
    const req = await fetch(url, {
        method: 'POST', // generar una nueva transacción
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({...order})
    })
    const json = await req.json()
    if(!req.ok) {
        const errors = ErrorResponseSchema.parse(json)
        return {
            errors: errors.message.map(issue => issue), //accedemos a cada error y lo retornamos
            success: ''
        }
    }
    const success = SuccessResponseSchema.parse(json)
    //revalidateTag('products-by-category')
    revalidatePath('/(store)/[categoryId]', 'page')

    return {
        errors: [],
        success: success.message
    }

 } //revalidateTagPermite invalidar los datos almacenados en caché bajo demanda para una etiqueta de caché específica.