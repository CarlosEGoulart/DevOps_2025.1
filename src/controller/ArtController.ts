import Art from "../model/Art";
import Database from "../db/Database";

export default class ArtController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public createArt(title: string, description: string, year: number): Art {
        return this.db.createArt(title, description, year);
    }

    public getArt(id: number): Art | undefined;
    public getArt(title: string): Art | undefined;
    public getArt(id: number, extra: string): Art | undefined;
    public getArt(param: number | string, extra?: string): Art | undefined {
        if (typeof param === "number") {
            if (typeof extra === "string") {
                return this.db.readArt(param);
            }
            return this.db.readArt(param);
        } else if (typeof param === "string") {
            return this.db.readArtByTitle(param);
        }
    }

    public listArts(): Art[] {
        return this.db.readAllArts();
    }

    public updateArt(id: number, title: string, description: string, year: number): boolean;
    public updateArt(param: number | string, title: string, description: string, year: number, extra?: string): boolean;
    public updateArt(id: number, title: string, description: string, year: number, extra?: string): boolean;
    public updateArt(param: number | string, title: string, description: string, year: number): boolean {
        if (typeof param === "number") {
            return this.db.updateArt(param, title, description, year);
        } else if (typeof param === "string") {
            const art = this.db.readArtByTitle(param);
            if (art) {
                return this.db.updateArt(art.getId(), title, description, year);
            }
        }
        return false;
    }

    public deleteArt(id: number): boolean;
    public deleteArt(title: string): boolean;
    public deleteArt(id: number, extra: string): boolean;
    public deleteArt(param: number | string): boolean {
        if (typeof param === "number") {
            return !!this.db.deleteArt(param);
        } else if (typeof param === "string") {
            const art = this.db.readArtByTitle(param);
            if (art) {
                return !!this.db.deleteArt(art.getId());
            }
        }
        return false;
    }

    public assignArtistToArt(idArt: number, idArtist: number): boolean {
        const artist = this.db.readArtist(idArtist);
        if (!artist) {
            return false;
        }
        return this.db.assignArtistToArt(idArt, artist);
    }
}