export interface FeedbackResponseData {
    code: number;
    message: string;
    data: boolean;
}

export interface FeedbackRequestData{
    email: string,
    subject: string,
    content: string,
}