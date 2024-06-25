export interface ResponseData {
    code: number;
    message: string;
}

export interface UserShippingRecordsData {
    uuid: string,
    quantity: number,
    price: number,
    creditCardNumber: string,
    email: string,
    shippingAddress: string,
    productName: string,
    productUrl: string,
}

export interface ShippingRecordsResponseData extends ResponseData{
    data: {
        records?: UserShippingRecordsData[],
        total: number,
        size: number,
        current: number,
        pages: number,
    }
}