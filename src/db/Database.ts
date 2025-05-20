import pool from '../config/ConfigMySQL';

export default class Database {
    // ART CRUD
    async createArt(title: string, description: string, year: number, imageUrl: string) {
        const [result] = await pool.execute(
            'INSERT INTO arts (title, description, year, image_url) VALUES (?, ?, ?, ?)',
            [title, description, year, imageUrl]
        );
        return result;
    }

    async listArts() {
        const [rows] = await pool.execute('SELECT * FROM arts');
        return rows;
    }

    async getArt(id: number) {
        const [rows] = await pool.execute('SELECT * FROM arts WHERE id = ?', [id]);
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }

    async updateArt(id: number, title: string, description: string, year: number) {
        const [result] = await pool.execute(
            'UPDATE arts SET title = ?, description = ?, year = ? WHERE id = ?',
            [title, description, year, id]
        );
        return result;
    }

    async deleteArt(id: number) {
        const [result] = await pool.execute('DELETE FROM arts WHERE id = ?', [id]);
        return result;
    }

// ARTIST CRUD
async createArtist(name: string, bio: string, birthYear: number, instagram: string) {
    const [result] = await pool.execute(
        'INSERT INTO artists (name, bio, birth_year, instagram) VALUES (?, ?, ?, ?)',
        [name, bio, birthYear, instagram]
    );
    return result;
}

async listArtists() {
    const [rows] = await pool.execute('SELECT * FROM artists');
    return rows;
}

async getArtist(id: number) {
    const [rows] = await pool.execute('SELECT * FROM artists WHERE id = ?', [id]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

async updateArtist(id: number, name: string, bio: string, birthYear: number, instagram: string) {
    const [result] = await pool.execute(
        'UPDATE artists SET name = ?, bio = ?, birth_year = ?, instagram = ? WHERE id = ?',
        [name, bio, birthYear, instagram, id]
    );
    return result;
}

async deleteArtist(id: number) {
    const [result] = await pool.execute('DELETE FROM artists WHERE id = ?', [id]);
    return result;
}

// EXHIBITION CRUD
async createExhibition(name: string, date: string, location: string) {
    const [result] = await pool.execute(
        'INSERT INTO exhibitions (name, date, location) VALUES (?, ?, ?)',
        [name, date, location]
    );
    return result;
}

async listExhibitions() {
    const [rows] = await pool.execute('SELECT * FROM exhibitions');
    return rows;
}

async getExhibition(id: number) {
    const [rows] = await pool.execute('SELECT * FROM exhibitions WHERE id = ?', [id]);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
}

async updateExhibition(id: number, name: string, date: string, location: string) {
    const [result] = await pool.execute(
        'UPDATE exhibitions SET name = ?, date = ?, location = ? WHERE id = ?',
        [name, date, location, id]
    );
    return result;
}

async deleteExhibition(id: number) {
    const [result] = await pool.execute('DELETE FROM exhibitions WHERE id = ?', [id]);
    return result;
}
}