"use client"

import { addProduct } from "@/actions/add-product-action"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify"

export default function AddProductForm({ children }: { children: React.ReactNode }) { // new/page.tsx

    const router = useRouter() //hook/(next navigator) para redireccionara la tabla de productos

    const [state, dispatch] = useActionState(addProduct, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if(state.success) {
            toast.success(state.success)
            router.push('/admin/products')
        }
    }, [state])

    return ( // componente formulario reutilizable
        <form
            className="space-y-5"
            action={dispatch}
        >
            {children}
            <input
                type="submit"
                className="rounded bg-green-400 font-bold py-2 w-full cursor-pointer"
                value="Agregar Producto"
            />
        </form>
    )
}

// acciona el server action (addProduct) y maneja el estado de la acción (errores y éxito) 
// para mostrar notificaciones y redireccionar al usuario después de agregar un producto. 