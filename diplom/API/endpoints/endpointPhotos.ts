import { AxiosResponse } from "axios";
import { defaultHeader, StatusCode } from "../../data/constants";
import { get, post } from "../api";

const endpointPhotos: string = "/photos";

export async function getPhotosByIdAlbum(albumId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let albumPhotos = await get(endpointPhotos, StatusCode.OK, defaultHeader, { albumId: albumId }, expectedErrorCode);
    return albumPhotos;
}

export async function getPhotoById(id: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let photo = await get(endpointPhotos, StatusCode.OK, defaultHeader, { id: id }, expectedErrorCode);
    return photo;
}

export async function downloadNewPhoto(
    albumId: number,
    title: string,
    url: string,
    thumbnailUrl: string,
    expectedErrorCode?: number,
): Promise<AxiosResponse> {
    let newPhoto = await post(
        endpointPhotos,
        StatusCode.CREATED,
        defaultHeader,
        { albumId: albumId, title: title, url: url, thumbnailUrl: thumbnailUrl },
        expectedErrorCode,
    );
    return newPhoto;
}

export async function downloadNewPhotoWithoutAlbumId(
    title: string,
    url: string,
    thumbnailUrl: string,
    expectedErrorCode?: number,
): Promise<AxiosResponse> {
    let newPhoto = await post(
        endpointPhotos,
        StatusCode.CREATED,
        defaultHeader,
        { title: title, url: url, thumbnailUrl: thumbnailUrl },
        expectedErrorCode,
    );
    return newPhoto;
}
