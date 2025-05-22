// Modelo para Obra de Arte
export interface Art {
  art_id?: number;
  title: string;
  description?: string;
  year: number;
  url_image?: string;
  artist_id?: number;
  created_at?: string;
  updated_at?: string;
}

// Classe para manipulação de obras de arte
export default class ArtController {
  private db: any;

  constructor(database: any) {
    this.db = database;
  }

  // Listar todas as obras de arte
  async listArts(): Promise<Art[]> {
    const sql = `
      SELECT a.*, artist.name as artist_name 
      FROM art a
      LEFT JOIN artist ON a.artist_id = artist.artist_id
      ORDER BY a.art_id DESC
    `;
    return await this.db.query(sql);
  }

  // Buscar obra de arte por ID
  async getArt(id: number): Promise<Art | null> {
    const sql = `
      SELECT a.*, artist.name as artist_name 
      FROM art a
      LEFT JOIN artist ON a.artist_id = artist.artist_id
      WHERE a.art_id = ?
    `;
    const results = await this.db.query(sql, [id]);
    return results.length > 0 ? results[0] : null;
  }

  // Criar nova obra de arte
  async createArt(title: string, description: string, year: number, urlImage: string, artistId?: number): Promise<Art> {
    const sql = `
      INSERT INTO art (title, description, year, url_image, artist_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const result = await this.db.query(sql, [title, description, year, urlImage, artistId || null]);
    
    return {
      art_id: result.insertId,
      title,
      description,
      year,
      url_image: urlImage,
      artist_id: artistId
    };
  }

  // Atualizar obra de arte existente
  async updateArt(id: number, title: string, description: string, year: number, urlImage: string, artistId?: number): Promise<{ success: boolean }> {
    const sql = `
      UPDATE art
      SET title = ?, description = ?, year = ?, url_image = ?, artist_id = ?
      WHERE art_id = ?
    `;
    
    const result = await this.db.query(sql, [title, description, year, urlImage, artistId || null, id]);
    
    return {
      success: result.affectedRows > 0
    };
  }

  // Excluir obra de arte
  async deleteArt(id: number): Promise<{ success: boolean }> {
    const sql = `DELETE FROM art WHERE art_id = ?`;
    const result = await this.db.query(sql, [id]);
    
    return {
      success: result.affectedRows > 0
    };
  }

  // Listar obras de arte por artista
  async listArtsByArtist(artistId: number): Promise<Art[]> {
    const sql = `
      SELECT * FROM art 
      WHERE artist_id = ?
      ORDER BY year DESC
    `;
    return await this.db.query(sql, [artistId]);
  }
}
