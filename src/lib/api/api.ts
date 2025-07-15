export interface ApiResponseError {
    response: {
        data: {
            message: string;
        };
    }
}

export interface ApiResponseSuccess {
    message: string;
    status: number;
    data: any;
}