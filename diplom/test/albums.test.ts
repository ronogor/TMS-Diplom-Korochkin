import { StatusCode } from "../data/constants";
import { createNewAlbum, getAlbumBiId, getAllAlbums, getUserAlbums } from "../API/endpoints/endpointAlbums";
import { randomNumber } from "../../helpers/randomNumber";
import { MinMaxIdPositive } from "../data/testData";

describe("Test requests for enndpoint /albums", () => {
    test("Test get all albums", async () => {
        let allAlbums = await getAllAlbums();
        expect(allAlbums.status).toBe(StatusCode.OK);
    });

    test("Test get allbum by id", async () => {
        let album = await getAlbumBiId(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_ALBUM_ID));
        expect(album.status).toBe(StatusCode.OK);
    });

    test("Test get user albums by user id", async () => {
        let userAlbums = await getUserAlbums(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID));
        expect(userAlbums.status).toBe(StatusCode.OK);
    });

    test("Test create new album", async () => {
        let newAlbum = await createNewAlbum("new title", randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID));
        expect(newAlbum.status).toBe(StatusCode.CREATED);
    });
});