// Modelo para Obra de Arte
export interface Art {
  id?: number;
  title: string;
  description?: string;
  year: number;
  image_url?: string;
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
    const sql = `SELECT * FROM arts ORDER BY id DESC`;
    return await this.db.query(sql);
  }

  // Buscar obra de arte por ID
  async getArt(id: number): Promise<Art | null> {
    const sql = `SELECT * FROM arts WHERE id = ?`;
    return await this.db.get(sql, [id]);
  }

  // Criar nova obra de arte
  async createArt(title: string, description: string, year: number, imageUrl: string): Promise<Art> {
    const sql = `
      INSERT INTO arts (title, description, year, image_url)
      VALUES (?, ?, ?, ?)
    `;
    
    const result = await this.db.run(sql, [title, description, year, imageUrl]);
    
    return {
      id: result.lastID,
      title,
      description,
      year,
      image_url: imageUrl
    };
  }

  // Atualizar obra de arte existente
  async updateArt(id: number, title: string, description: string, year: number, imageUrl: string): Promise<{ success: boolean }> {
    const sql = `
      UPDATE arts
      SET title = ?, description = ?, year = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const result = await this.db.run(sql, [title, description, year, imageUrl, id]);
    
    return {
      success: result.changes > 0
    };
  }

  // Excluir obra de arte
  async deleteArt(id: number): Promise<{ success: boolean }> {
    const sql = `DELETE FROM arts WHERE id = ?`;
    const result = await this.db.run(sql, [id]);
    
    return {
      success: result.changes > 0
    };
  }
}
