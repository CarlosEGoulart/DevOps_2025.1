import Database from '../db/Database';

export default class ArtController {
    private db: Database;
    constructor(db: Database) {
        this.db = db;
    }

    async createArt(title: string, description: string, year: number, imageUrl: string) {
        return await this.db.createArt(title, description, year, imageUrl);
    }

    async listArts() {
        return await this.db.listArts();
    }

    async getArt(id: number) {
        return await this.db.getArt(id);
    }

    async updateArt(id: number, title: string, description: string, year: number) {
        return await this.db.updateArt(id, title, description, year);
    }

    async deleteArt(id: number) {
        return await this.db.deleteArt(id);
    }
}