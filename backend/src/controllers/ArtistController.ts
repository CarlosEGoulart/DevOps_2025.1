// Modelo para Artista
export interface Artist {
  id?: number;
  name: string;
  bio?: string;
  birth_year: number;
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
    const sql = `SELECT * FROM artists ORDER BY name`;
    return await this.db.query(sql);
  }

  // Buscar artista por ID
  async getArtist(id: number): Promise<Artist | null> {
    const sql = `SELECT * FROM artists WHERE id = ?`;
    return await this.db.get(sql, [id]);
  }

  // Criar novo artista
  async createArtist(name: string, bio: string, birthYear: number, instagram: string): Promise<Artist> {
    const sql = `
      INSERT INTO artists (name, bio, birth_year, instagram)
      VALUES (?, ?, ?, ?)
    `;
    
    const result = await this.db.run(sql, [name, bio, birthYear, instagram]);
    
    return {
      id: result.lastID,
      name,
      bio,
      birth_year: birthYear,
      instagram
    };
  }

  // Atualizar artista existente
  async updateArtist(id: number, name: string, bio: string, birthYear: number, instagram: string): Promise<{ success: boolean }> {
    const sql = `
      UPDATE artists
      SET name = ?, bio = ?, birth_year = ?, instagram = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const result = await this.db.run(sql, [name, bio, birthYear, instagram, id]);
    
    return {
      success: result.changes > 0
    };
  }

  // Excluir artista
  async deleteArtist(id: number): Promise<{ success: boolean }> {
    const sql = `DELETE FROM artists WHERE id = ?`;
    const result = await this.db.run(sql, [id]);
    
    return {
      success: result.changes > 0
    };
  }
}
