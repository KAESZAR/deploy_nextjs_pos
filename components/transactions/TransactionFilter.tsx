"use client"

import { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { format } from 'date-fns'
import { useQuery } from "@tanstack/react-query"
import { getSalesByDate } from "@/src/api"
import TransactionSummary from "./TransactionSummary"
import { formatCurrency } from "@/src/utils"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export default function TransactionFilter() {
    const [date, setDate] = useState<Value>(new Date())

    const formattedDate = format(date?.toString() || new Date(), 'yyyy-MM-dd')
    const { data, isLoading} = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate)
    })

    // A este nive "data" puede ser undefined, por eso el "?" y el "?? 0" es para que si es undefined tome el valor de 0 
    const total = data?.reduce((total, transaction) => total + +transaction.total, 0 ) ?? 0

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10 relative items-start">
            <div className="lg:sticky lg:top-10">
                <Calendar
                    value={date}
                    onChange={setDate}
                    locale="es"
                />
            </div>

            <div>
                {isLoading && 'Cargando...'}

                { data ?  data.length ? data.map(transaction => (
                    <TransactionSummary
                        key={transaction.id}
                        transaction={transaction}
                    />
                )) : <p className="text-lg text-center">No hay ventas en esta fecha</p> : null }

                <p className="my-5 text-lg font-bold text-right">Total del día: {''}
                    <span className="font-normal">{formatCurrency(total)}</span>
                </p>
            </div>
        </div>
    )
}
// React query se encarga de manejar el estado de la consulta, el cacheo y la actualización de los datos, 
// lo que facilita la gestión de datos asíncronos en React.
// Si el "client" renderiza diferente al "server", se puede usar "HydrationBoundary" para evitar errores de hidratación,
