import Database from "../db/Database";
import Artist from "../model/Artist";

export default class ArtistController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public createArtist(name: string, bio: string, birthYear: number, instagram: string): Artist {
        return this.db.createArtist(name, bio, birthYear, instagram);
    }

    public getArtist(id: number): Artist | undefined;
    public getArtist(name: string): Artist | undefined;
    public getArtist(id: number, extra: string): Artist | undefined;
    public getArtist(param: number | string, extra?: string): Artist | undefined {
        if (typeof param === "number") {
            if (typeof extra === "string") {
                return this.db.readArtist(param);
            }
            return this.db.readArtist(param);
        } else if (typeof param === "string") {
            return this.db.readArtistByName(param);
        }
    }

    public listArtists(): Artist[] {
        return this.db.readAllArtists();
    }

    public updateArtist(id: number, name: string, bio: string, birthYear: number, instagram: string): boolean;
    public updateArtist(param: number | string, name: string, bio: string, birthYear: number, instagram: string, extra?: string): boolean;
    public updateArtist(id: number, name: string, bio: string, birthYear: number, instagram: string, extra?: string): boolean;
    public updateArtist(param: number | string, name: string, bio: string, birthYear: number, instagram: string, extra?: string): boolean {
        if (typeof param === "number") {
            return this.db.updateArtist(param, name, bio, birthYear, instagram);
        } else if (typeof param === "string") {
            const artist = this.db.readArtistByName(param);
            if (artist) {
                return this.db.updateArtist(artist.getId(), name, bio, birthYear, instagram);
            }
        }
        return false;
    }

    public deleteArtist(id: number): boolean;
    public deleteArtist(name: string): boolean;
    public deleteArtist(id: number, extra: string): boolean;
    public deleteArtist(param: number | string, extra?: string): boolean {
        if (typeof param === "number") {
            return !!this.db.deleteArtist(param);
        } else if (typeof param === "string") {
            const artist = this.db.readArtistByName(param);
            if (artist) {
                return !!this.db.deleteArtist(artist.getId());
            }
        }
        return false;
    }
}