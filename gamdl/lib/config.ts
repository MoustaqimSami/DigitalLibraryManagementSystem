const config = {
    env: {
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL,
            privateKey: process.env.NEXT_PRIVATE_IMAGEKIT_KEY
        }
    }
}

export default config;