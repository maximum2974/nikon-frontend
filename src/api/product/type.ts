export interface ResponseData{
    code: number,
    message: string,
}

export interface ProductData{
    uuid: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productUrl: string,
    quantity: number
}

export interface ProductResponseData extends ResponseData{
    data: {
        records: ProductData[],
        total: number,
        size: number,
        current: number,
        pages: number,
    }
}

export interface PurchaseProduct {
    productUuid: string,
    quantity: number,
    creditCardNumber: string,
    email: string,
    shippingAddress: string,
}

export interface PurchaseProductResponseData extends ResponseData {
    data?: boolean | null,
}