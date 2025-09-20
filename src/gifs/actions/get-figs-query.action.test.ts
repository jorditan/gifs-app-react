import AxiosMockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-query.action";
import { giphyApi } from "../api/giphy.api";
import { giphySearchResponseMock } from "../../../tests/mocks/giphy.response.data";

describe("getGifsByQuery", () => {
  let mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });


  test("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphySearchResponseMock);

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.height).toBe("number");
      expect(typeof gif.title).toBe("string");
      expect(typeof gif.url).toBe("string");
    });
  });

  test("should return an empty list of gifs if query is empty", async () => {
    // mock.onGet("/search").reply(200, giphySearchResponseMock);
    mock.restore();

    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
  });

  test("should handle error when API returns an error", async () => {
    // Cuando queremos asegurarnos que algo es llamado, nos podemos poner un espía. Un mock es un objeto ficticio.
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock.onGet("/search").reply(400, {
      data: {
        message: "bad request",
      },
    });

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
