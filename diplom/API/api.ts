import axios, { AxiosResponse } from "axios"

const mainUrl: string = "https://jsonplaceholder.typicode.com/";

const handleResponse = async (actualResponse: AxiosResponse, expectedStatusCode: number): Promise<AxiosResponse> => {
    expect(actualResponse.status).toEqual(expectedStatusCode);
    return actualResponse;
};

const handleError = async (actualErrorResponse: AxiosResponse, expectedError?: number): Promise<AxiosResponse> => {
    expect(actualErrorResponse.status).toEqual(expectedError);
    return actualErrorResponse;
};

export async function request(endpoint: string, method: string, statusCode: number, headers: object, body?: object, expectedErrorCode?: number): Promise<any> {
    try {
        const sendedRequest = await axios({
            method: method,
            url: `${mainUrl}${endpoint}`,
            headers: headers,
            data: body ?? {}
        });
        return handleResponse(sendedRequest, statusCode);
    } catch (error: any) {
        return handleError(error.response, expectedErrorCode);
    }
}