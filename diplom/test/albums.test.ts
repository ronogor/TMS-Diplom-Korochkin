import { CheckPropertyType, StatusCode } from "../data/constants";
import { createNewAlbum, getAlbumBiId, getAllAlbums, getUserAlbums } from "../API/endpoints/endpointAlbums";
import { randomNumber } from "../../helpers/randomNumber";
import { MinMaxIdPositive } from "../data/constants";
import { IAlbum } from "../data/responseModel/album.model";
import { albumTitle } from "../data/testData/album.data";

describe("Test requests for enndpoint /albums", () => {
    test("Test get all albums", async () => {
        const allAlbums = await getAllAlbums();

        expect(allAlbums.status).toBe(StatusCode.OK);

        const firstAlbumData: IAlbum = allAlbums.data[0];

        expect(typeof firstAlbumData.userId).toBe(CheckPropertyType.NUMBER);
        expect(typeof firstAlbumData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof firstAlbumData.title).toBe(CheckPropertyType.STRING);
    });

    test("Test get allbum by id", async () => {
        const id: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID);
        const albumById = await getAlbumBiId(id);

        expect(albumById.status).toBe(StatusCode.OK);

        const albumData: IAlbum = albumById.data[0];

        expect(typeof albumData.userId).toBe(CheckPropertyType.NUMBER);
        expect(typeof albumData.id).toBe(CheckPropertyType.NUMBER);
        expect(albumData.id).toBe(id);
        expect(typeof albumData.title).toBe(CheckPropertyType.STRING);
    });

    test("Test get user albums by user id", async () => {
        const userId: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID);
        const userAlbums = await getUserAlbums(userId);

        expect(userAlbums.status).toBe(StatusCode.OK);

        const firstUserAlbumData: IAlbum = userAlbums.data[0];

        expect(typeof firstUserAlbumData.userId).toBe(CheckPropertyType.NUMBER);
        expect(firstUserAlbumData.userId).toBe(userId);
        expect(typeof firstUserAlbumData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof firstUserAlbumData.title).toBe(CheckPropertyType.STRING);
    });

    test("Test create new album", async () => {
        const userId: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID);
        const newAlbum = await createNewAlbum(albumTitle, userId);

        expect(newAlbum.status).toBe(StatusCode.CREATED);

        const albumData: IAlbum = newAlbum.data;
        expect(typeof albumData.userId).toBe(CheckPropertyType.NUMBER);
        expect(albumData.userId).toBe(userId);
        expect(typeof albumData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof albumData.title).toBe(CheckPropertyType.STRING);
        expect(albumData.title).toBe(albumTitle);
    });
});
