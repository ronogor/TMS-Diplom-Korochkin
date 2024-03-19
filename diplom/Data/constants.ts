export enum RequestMethods {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch",
}
export const defaultHeader: {
    "Content-Type": string;
} = {
    "Content-Type": "application/json; charset=UTF-8",
};

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
}

export enum MinMaxIdPositive {
    MIN_ID = 1,
    MAX_POST_ID = 100,
    MAX_ALBUM_ID = 100,
    MAX_COMMENT_ID = 500,
    MAX_PHOTO_ID = 5000,
    MAX_USER_ID = 10,
}

export enum CheckPropertyType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
}

export const voidArray: [] = [];
