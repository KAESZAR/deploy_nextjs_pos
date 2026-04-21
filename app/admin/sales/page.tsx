import TransactionFilter from "@/components/transactions/TransactionFilter";
import Heading from "@/components/ui/Heading";
import { getSalesByDate } from "@/src/api";
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { format } from "date-fns";


export default async function SalesPage() {
  const queryClient = new QueryClient()

  //ventas del dia
  const today = new Date()
  const formattedDate = format(today, 'yyyy-MM-dd')
  await queryClient.prefetchQuery({ //prefetchQuery hace la consulta antes de que el componente se renderice
    queryKey: ['sales', formattedDate], //evita hacer nuevamente la consulta una ves que se hizo
    queryFn: () => getSalesByDate(formattedDate) //funcion-consulta hacia la Api
  })

  return (
    <>
    <Heading>Ventas</Heading>
    <p className="text_lg">En esta sección aparecerán las ventas, utiliza el calendario para filtrar por fecha.</p>
    
    
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
    </>
  )
}
       
     
// comoponente cliente/calendario _ * npm i react-calendar 
// npm i @tanstack/react-query

//por cada cambio de fecha hacemos una consulta nueva
/*
<HydrationBoundary state={dehydrate(queryClient)}>
        <TransactionFilter />
      </HydrationBoundary>
*/ 