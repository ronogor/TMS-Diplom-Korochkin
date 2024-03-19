import { AxiosResponse } from "axios";
import { defoultHeader, StatusCode } from "../../Data/constants";
import { get, post } from "../api";

const endpointAlbum: string = "/albums";

export async function getAllAlbums(expectedErrorCode?: number): Promise<AxiosResponse> {
    let allAlbums = await get(endpointAlbum, StatusCode.OK, defoultHeader, {}, expectedErrorCode);
    return allAlbums;
};

export async function getAlbumBiId(id: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let album = await get(endpointAlbum, StatusCode.OK, defoultHeader, {"id": id}, expectedErrorCode);
    return album;
};

export async function getUserAlbums(userId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let userAlbums = await get(endpointAlbum, StatusCode.OK, defoultHeader, {"userId": userId}, expectedErrorCode);
    return userAlbums;
};

export async function createNewAlbum(title: string, userId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let newAlbum = await post(endpointAlbum, StatusCode.CREATED, defoultHeader, {"title": title, "userId": userId}, expectedErrorCode);
    return newAlbum;
};