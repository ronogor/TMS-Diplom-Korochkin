import { StatusCode } from "../data/constants";
import { downloadNewPhoto, getPhotoById, getPhotosByIdAlbum, downloadNewPhotoWithoutAlbumId } from "../API/endpoints/endpointPhotos";
import { randomNumber, randomNumberNegative } from "../../helpers/randomNumber";
import { MinMaxIdPositive, PhotoBodyData } from "../data/testData";

describe("Test requests for enndpoint /posts", () => {
    test("Test get phoos by album id", async () => {
        let albumPhotos = await getPhotosByIdAlbum(2);
        expect(albumPhotos.status).toBe(StatusCode.OK);
    });

    test("Test get photo by id", async () => {
        let photo = await getPhotoById(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_PHOTO_ID));
        expect(photo.status).toBe(StatusCode.OK);
    });

    test("Test download new Photo", async () => {
        let newPhoto = await downloadNewPhoto(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_ALBUM_ID), PhotoBodyData.TITLE, PhotoBodyData.URL, PhotoBodyData.THUMBNAI_URL);
        expect(newPhoto.status).toBe(StatusCode.CREATED);
    });

    test("Test download new Photo with invalid album id", async () => {
        let newPhoto = await downloadNewPhoto(randomNumberNegative(), PhotoBodyData.TITLE, PhotoBodyData.URL, PhotoBodyData.THUMBNAI_URL);
        expect(newPhoto.status).toBe(StatusCode.CREATED);
    });

    test("Test download new photo without albumId", async () => {
        let newPhoto = await downloadNewPhotoWithoutAlbumId(PhotoBodyData.TITLE, PhotoBodyData.URL, PhotoBodyData.THUMBNAI_URL);
        expect(newPhoto.status).toBe(StatusCode.CREATED);
    });
});