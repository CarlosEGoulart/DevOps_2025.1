"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Art_1 = __importDefault(require("./model/Art"));
const Artist_1 = __importDefault(require("./model/Artist"));
const Exhibition_1 = __importDefault(require("./model/Exhibition"));
test("Test Art class", () => {
    const art = new Art_1.default(1, "Starry Night", "A painting by Vincent van Gogh", 1889);
    expect(art.getId()).toBe(1);
    expect(art.getName()).toBe("Starry Night");
    expect(art.getDescription()).toBe("A painting by Vincent van Gogh");
    expect(art.getYear()).toBe(1889);
});
test("Test Artist class", () => {
    const artist = new Artist_1.default(1, "Vincent van Gogh", "Dutch post-impressionist painter", 1853, "@vangogh");
    expect(artist.getId()).toBe(1);
    expect(artist.getName()).toBe("Vincent van Gogh");
    expect(artist.getBio()).toBe("Dutch post-impressionist painter");
    expect(artist.getInstagram()).toBe("@vangogh");
});
test("Test Exhibition class", () => {
    const exhibition = new Exhibition_1.default(1, "Impressionist Art", "A collection of impressionist paintings", [1, 2]);
    expect(exhibition.getId()).toBe(1);
    expect(exhibition.getName()).toBe("Impressionist Art");
    expect(exhibition.getDescription()).toBe("A collection of impressionist paintings");
    expect(exhibition.getArtWorks()).toEqual([1, 2]);
});
