import Database from "../db/Database";
import Exhibition from "../model/Exhibition";
import Art from "../model/Art";

export default class ExhibitionController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public createExhibition(name: string, description: string, artWorks: number[] = []): Exhibition {
        return this.db.createExhibition(name, description, artWorks);
    }

    public getExhibition(id: number): Exhibition | undefined;
    public getExhibition(name: string): Exhibition | undefined;
    public getExhibition(id: number, extra: string): Exhibition | undefined;
    public getExhibition(param: number | string, extra?: string): Exhibition | undefined {
        if (typeof param === "number") {
            if (typeof extra === "string") {
                return this.db.readExhibition(param);
            }
            return this.db.readExhibition(param);
        } else if (typeof param === "string") {
            return this.db.readExhibitionByName(param);
        }
    }

    public listExhibitions(): Exhibition[] {
        return this.db.readAllExhibitions();
    }

    public updateExhibition(id: number, name: string, description: string, artWorks: number[]): boolean;
    public updateExhibition(param: number | string, name: string, description: string, artWorks: number[], extra?: string): boolean;
    public updateExhibition(id: number, name: string, description: string, artWorks: number[], extra?: string): boolean;
    public updateExhibition(param: number | string, name: string, description: string, artWorks: number[]): boolean {
        if (typeof param === "number") {
            return this.db.updateExhibition(param, name, description, artWorks);
        } else if (typeof param === "string") {
            const exhibition = this.db.readExhibitionByName(param);
            if (exhibition) {
                return this.db.updateExhibition(exhibition.getId(), name, description, artWorks);
            }
        }
        return false;
    }

    public deleteExhibition(id: number): boolean;
    public deleteExhibition(name: string): boolean;
    public deleteExhibition(id: number, extra: string): boolean;
    public deleteExhibition(param: number | string): boolean {
        if (typeof param === "number") {
            return this.db.deleteExhibition(param);
        } else if (typeof param === "string") {
            const exhibition = this.db.readExhibitionByName(param);
            if (exhibition) {
                return this.db.deleteExhibition(exhibition.getId());
            }
        }
        return false;
    }

    public addArtToExhibition(idExhibition: number, idArt: number): boolean {
        return this.db.addArtToExhibition(idExhibition, idArt);
    }

    public removeArtFromExhibition(idExhibition: number, idArt: number): boolean {
        return this.db.removeArtFromExhibition(idExhibition, idArt);
    }

    public getExhibitionArts(idExhibition: number): Art[] | undefined{
        return this.db.getExhibitionArts(idExhibition);
    }
}
