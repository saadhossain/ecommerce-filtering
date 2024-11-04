export interface ProductType {
    availabilityStatus: string,
    brand: string,
    category: string,
    description: string,
    dimensions: {
        depth: number,
        height: number,
        width: number
    },
    discountPercentage: number,
    id: number,
    images: string[],
    meta: {
        barcode: string,
        createdAt: string,
        qrCode: string,
        updatedAt: string
    },
    minimumOrderQuantity: number,
    price: number,
    rating: number,
    returnPolicy: string,
    reviews: [],
    shippingInformation: string,
    sku: string,
    stock: number,
    tags: [],
    thumbnail: string,
    title: string,
    warrantyInformation: string,
    weight: number
}