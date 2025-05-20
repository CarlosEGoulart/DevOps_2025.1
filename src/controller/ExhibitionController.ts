import Database from "../db/Database";

export default class ExhibitionController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public async createExhibition(name: string, date: string, location: string) {
        return await this.db.createExhibition(name, date, location);
    }

    public async listExhibitions() {
        return await this.db.listExhibitions();
    }

    public async getExhibition(id: number) {
        return await this.db.getExhibition(id);
    }

    public async updateExhibition(id: number, name: string, date: string, location: string) {
        return await this.db.updateExhibition(id, name, date, location);
    }

    public async deleteExhibition(id: number) {
        return await this.db.deleteExhibition(id);
    }
}
