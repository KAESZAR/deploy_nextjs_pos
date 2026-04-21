

export async function POST(request: Request) {
    const coupon = await request.json()
    const url = `${process.env.API_URL}/coupons/apply-coupon`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(coupon)
    })
    const response = await req.json()

    return Response.json({...response, status: req.status})


}