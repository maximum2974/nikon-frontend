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

export interface AdminPutawayResonseData extends ResponseData{
    data: string
}

export interface AdminPutawayRequestData{
    uuid: string
}

export interface PutawayProductResponseData extends ResponseData{
    data: {
        records: ProductData[],
        total: number,
        size: number,
        current: number,
        pages: number,
    }
}

export interface RemovalProductRequestData{
    uuid: string,
}

export interface RemovalProductResponseData extends ResponseData{
    data: boolean
}

export interface AddOrUpdateProductRequestData{
    uuid?: string,
    productName: string,
    productDescription: string,
    productPrice: number,
    quantity: number,
    productUrl: string
}

export interface AddOrUpdateProductResponseData extends ResponseData{
    data: boolean
}