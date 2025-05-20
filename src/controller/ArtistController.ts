import Database from '../db/Database';

export default class ArtistController {
    private db: Database;
    constructor(db: Database) { this.db = db; }

    async createArtist(name: string, bio: string, birthYear: number, instagram: string) {
        return await this.db.createArtist(name, bio, birthYear, instagram);
    }

    async listArtists() {
        return await this.db.listArtists();
    }

    async getArtist(id: number) {
        return await this.db.getArtist(id);
    }

    async updateArtist(id: number, name: string, bio: string, birthYear: number, instagram: string) {
        return await this.db.updateArtist(id, name, bio, birthYear, instagram);
    }

    async deleteArtist(id: number) {
        return await this.db.deleteArtist(id);
    }
}