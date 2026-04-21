import { CategoryWithProductsResponseSchema } from "@/src/schemas"
import ProductCard from "@/components/products/ProductCard"
import { redirect } from "next/navigation"

type Params = Promise<{categoryId: string}>

async function getProducts(categoryId: string) {
    const url = `${process.env.API_URL}/categories/${categoryId}?products=true`
    const req = await fetch(url, {
        next: {//extencion de fetch 
            tags: ['products-by-category']
        }
    })
    const json = await req.json()
    //en caso de que la consulta no sea correcta
    if(!req.ok) {
        redirect('/1')
    }

    const products = CategoryWithProductsResponseSchema.parse(json)
    return products
    
}

export default async function StorePage({params}: {params: Params}) {
    const { categoryId } = await params
    const category = await getProducts(categoryId)

    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {category.products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
        </div>
    )
}
    

// validacion con zod "npm i zod", 