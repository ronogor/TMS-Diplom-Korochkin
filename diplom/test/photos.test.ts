import { CheckPropertyType, StatusCode } from "../data/constants";
import {
    downloadNewPhoto,
    getPhotoById,
    getPhotosByIdAlbum,
    downloadNewPhotoWithoutAlbumId,
} from "../API/endpoints/endpointPhotos";
import { randomNumber, randomNumberNegative } from "../../helpers/randomNumber";
import { PhotoBodyData } from "../data/testData/photo.data";
import { MinMaxIdPositive } from "../data/constants";
import { IPhoto } from "../data/responseModel/photo.model";

describe("Test requests for enndpoint /posts", () => {
    test("Test get phoos by album id", async () => {
        const albumId: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_ALBUM_ID);
        const albumPhotos = await getPhotosByIdAlbum(albumId);

        expect(albumPhotos.status).toBe(StatusCode.OK);

        const albumFirstPhotoData: IPhoto = albumPhotos.data[0];

        expect(typeof albumFirstPhotoData.albumId).toBe(CheckPropertyType.NUMBER);
        expect(albumFirstPhotoData.albumId).toBe(albumId);
        expect(typeof albumFirstPhotoData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof albumFirstPhotoData.url).toBe(CheckPropertyType.STRING);
        expect(typeof albumFirstPhotoData.thumbnailUrl).toBe(CheckPropertyType.STRING);
        expect(typeof albumFirstPhotoData.title).toBe(CheckPropertyType.STRING);
    });

    test("Test get photo by id", async () => {
        const id: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_PHOTO_ID);
        const photo = await getPhotoById(id);

        expect(photo.status).toBe(StatusCode.OK);

        const photoData: IPhoto = photo.data[0];

        expect(typeof photoData.albumId).toBe(CheckPropertyType.NUMBER);
        expect(typeof photoData.id).toBe(CheckPropertyType.NUMBER);
        expect(photoData.id).toBe(id);
        expect(typeof photoData.url).toBe(CheckPropertyType.STRING);
        expect(typeof photoData.thumbnailUrl).toBe(CheckPropertyType.STRING);
        expect(typeof photoData.title).toBe(CheckPropertyType.STRING);
    });

    test("Test download new Photo", async () => {
        const albumId: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_ALBUM_ID);
        const newPhoto = await downloadNewPhoto(
            albumId,
            PhotoBodyData.TITLE,
            PhotoBodyData.URL,
            PhotoBodyData.THUMBNAI_URL,
        );

        expect(newPhoto.status).toBe(StatusCode.CREATED);

        const newPhotoData: IPhoto = newPhoto.data;

        expect(typeof newPhotoData.albumId).toBe(CheckPropertyType.NUMBER);
        expect(newPhotoData.albumId).toBe(albumId);
        expect(typeof newPhotoData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof newPhotoData.url).toBe(CheckPropertyType.STRING);
        expect(typeof newPhotoData.thumbnailUrl).toBe(CheckPropertyType.STRING);
        expect(typeof newPhotoData.title).toBe(CheckPropertyType.STRING);
    });

    test("Test download new Photo with invalid album id", async () => {
        const albumId: number = randomNumberNegative();
        const newPhoto = await downloadNewPhoto(
            albumId,
            PhotoBodyData.TITLE,
            PhotoBodyData.URL,
            PhotoBodyData.THUMBNAI_URL,
        );

        expect(newPhoto.status).toBe(StatusCode.CREATED);

        const newPhotoData: IPhoto = newPhoto.data;

        expect(typeof newPhotoData.albumId).toBe(CheckPropertyType.NUMBER);
        expect(newPhotoData.albumId).toBe(albumId);
        expect(typeof newPhotoData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof newPhotoData.url).toBe(CheckPropertyType.STRING);
        expect(typeof newPhotoData.thumbnailUrl).toBe(CheckPropertyType.STRING);
        expect(typeof newPhotoData.title).toBe(CheckPropertyType.STRING);
    });

    test("Test download new photo without albumId", async () => {
        const newPhoto = await downloadNewPhotoWithoutAlbumId(
            PhotoBodyData.TITLE,
            PhotoBodyData.URL,
            PhotoBodyData.THUMBNAI_URL,
        );

        expect(newPhoto.status).toBe(StatusCode.CREATED);

        const newPhotoData: IPhoto = newPhoto.data;

        expect(typeof newPhotoData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof newPhotoData.url).toBe(CheckPropertyType.STRING);
        expect(typeof newPhotoData.thumbnailUrl).toBe(CheckPropertyType.STRING);
        expect(typeof newPhotoData.title).toBe(CheckPropertyType.STRING);
    });
});
