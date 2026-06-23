import { TransactionsResponseSchema, ErrorResponseSchema } from "./schemas"

export async function getSalesByDate(date: string) {
    const url = `${process.env.NEXT_PUBLIC_DOMAIN}/admin/sales/api?transactionDate=${date}`

    const req = await fetch(url)

    if (!req.ok) {
        console.error(`API responded with ${req.status} for date ${date}`)
        return []
    }

    const json = await req.json()

    const errorCheck = ErrorResponseSchema.safeParse(json)
    if (errorCheck.success) {
        console.error('Backend returned error:', errorCheck.data.message)
        return []
    }

    const transactions = TransactionsResponseSchema.safeParse(json)

    if (!transactions.success) {
        console.error('Zod validation failed. Backend returned:', JSON.stringify(json).slice(0, 500))
        return []
    }

    return transactions.data
}