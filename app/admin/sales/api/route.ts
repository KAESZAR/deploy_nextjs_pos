import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const transactionDate = searchParams.get('transactionDate')

    if (!process.env.API_URL) {
        console.error('API_URL environment variable is not set')
        return NextResponse.json({ error: 'API_URL not configured' }, { status: 500 })
    }

    const url = `${process.env.API_URL}/transactions?transactionDate=${transactionDate}`

    try {
        const req = await fetch(url)

        if (!req.ok) {
            const errorBody = await req.text()
            console.error(`Backend responded with ${req.status}: ${errorBody}`)
            return NextResponse.json(
                { error: `Backend error: ${req.status}`, details: errorBody },
                { status: req.status }
            )
        }

        const response = await req.json()
        return NextResponse.json(response)
    } catch (error) {
        console.error('Error fetching from backend:', error)
        return NextResponse.json(
            { error: 'Failed to fetch from backend', details: String(error) },
            { status: 502 }
        )
    }

}

