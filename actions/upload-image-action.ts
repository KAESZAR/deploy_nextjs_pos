"use server"

export async function uploadImage(formData: FormData) : Promise<string> {
    const url = `${process.env.API_URL}/products/upload-image`
    const req = await fetch(url, {
        method: 'POST',
        body: formData
    })
    // recupero info imagen
    const image = await req.json()
    return image.secure_url 
}

// lo único que se tiene que almacenar en BD es la dir. de la imagen, 
// ej:"secure_url":"https://res.cloudinary.com/dt9jyaoef/image/upload/v1776454351/jh4ppop6n5969hbdydqs.jpg",