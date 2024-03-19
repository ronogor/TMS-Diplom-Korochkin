import { AxiosResponse } from "axios";
import { defaultHeader, StatusCode } from "../../data/constants";
import { get, post } from "../api";

const endpointAlbum: string = "/albums";

export async function getAllAlbums(expectedErrorCode?: number): Promise<AxiosResponse> {
    let allAlbums = await get(endpointAlbum, StatusCode.OK, defaultHeader, {}, expectedErrorCode);
    return allAlbums;
}

export async function getAlbumBiId(id: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let album = await get(endpointAlbum, StatusCode.OK, defaultHeader, { id: id }, expectedErrorCode);
    return album;
}

export async function getUserAlbums(userId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let userAlbums = await get(endpointAlbum, StatusCode.OK, defaultHeader, { userId: userId }, expectedErrorCode);
    return userAlbums;
}

export async function createNewAlbum(
    title: string,
    userId: number,
    expectedErrorCode?: number,
): Promise<AxiosResponse> {
    let newAlbum = await post(
        endpointAlbum,
        StatusCode.CREATED,
        defaultHeader,
        { title: title, userId: userId },
        expectedErrorCode,
    );
    return newAlbum;
}
