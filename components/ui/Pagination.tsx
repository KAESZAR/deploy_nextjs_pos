import Link from "next/link"

type PaginationProps = {
    page: number
    totalPages: number
    baseUrl: string
}
//mostrar los números de página y los enlaces de navegación
export default function Pagination({page, totalPages, baseUrl} : PaginationProps ) {

    const pages = Array.from({length: totalPages}, (_, i) => i + 1)


  return (
    <nav className="flex justify-center py-10">
        {page > 1 && (
            <Link
                href={`${baseUrl}?page=${page - 1}`}// para ir a la página anterior
                className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >&laquo;</Link>//entidad HTML para flechas
        )}
       
        {pages.map(currentPage => ( //se actualiza dinamicamente según el número total de páginas
            <Link
                key={currentPage}
                href={`${baseUrl}?page=${currentPage}`}
                className={`${page === currentPage && 'font-black'}  px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 `}
            >{currentPage}</Link>
        ))}

        {page < totalPages && (
            <Link
                href={`${baseUrl}?page=${page + 1}`}
                className="px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >&raquo;</Link>
        )}
    </nav>
  )
}

