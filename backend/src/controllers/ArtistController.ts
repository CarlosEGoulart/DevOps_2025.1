// Modelo para Artista
export interface Artist {
  artist_id?: number;
  name: string;
  bio?: string;
  year: number;
  instagram?: string;
  created_at?: string;
  updated_at?: string;
}

// Classe para manipulação de artistas
export default class ArtistController {
  private db: any;

  constructor(database: any) {
    this.db = database;
  }

  // Listar todos os artistas
  async listArtists(): Promise<Artist[]> {
    const sql = `SELECT * FROM artist ORDER BY name`;
    return await this.db.query(sql);
  }

  // Buscar artista por ID
  async getArtist(id: number): Promise<Artist | null> {
    const sql = `SELECT * FROM artist WHERE artist_id = ?`;
    const results = await this.db.query(sql, [id]);
    return results.length > 0 ? results[0] : null;
  }

  // Criar novo artista
  async createArtist(name: string, bio: string, year: number, instagram: string): Promise<Artist> {
    const sql = `
      INSERT INTO artist (name, bio, year, instagram)
      VALUES (?, ?, ?, ?)
    `;
    
    const result = await this.db.query(sql, [name, bio, year, instagram]);
    
    return {
      artist_id: result.insertId,
      name,
      bio,
      year,
      instagram
    };
  }

  // Atualizar artista existente
  async updateArtist(id: number, name: string, bio: string, year: number, instagram: string): Promise<{ success: boolean }> {
    const sql = `
      UPDATE artist
      SET name = ?, bio = ?, year = ?, instagram = ?
      WHERE artist_id = ?
    `;
    
    const result = await this.db.query(sql, [name, bio, year, instagram, id]);
    
    return {
      success: result.affectedRows > 0
    };
  }

  // Excluir artista
  async deleteArtist(id: number): Promise<{ success: boolean }> {
    const sql = `DELETE FROM artist WHERE artist_id = ?`;
    const result = await this.db.query(sql, [id]);
    
    return {
      success: result.affectedRows > 0
    };
  }
}
