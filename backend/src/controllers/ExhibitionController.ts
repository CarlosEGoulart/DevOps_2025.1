// Modelo para Exposição
export interface Exhibition {
  exhibition_id?: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Modelo para relacionamento Exposição-Arte
export interface ExhibitionArt {
  exhibition_art_id?: number;
  exhibition_id: number;
  art_id: number;
  created_at?: string;
}

// Classe para manipulação de exposições
export default class ExhibitionController {
  private db: any;

  constructor(database: any) {
    this.db = database;
  }

  // Listar todas as exposições
  async listExhibitions(): Promise<Exhibition[]> {
    const sql = `SELECT * FROM exhibition ORDER BY name`;
    return await this.db.query(sql);
  }

  // Buscar exposição por ID
  async getExhibition(id: number): Promise<Exhibition | null> {
    const sql = `SELECT * FROM exhibition WHERE exhibition_id = ?`;
    const results = await this.db.query(sql, [id]);
    return results.length > 0 ? results[0] : null;
  }

  // Criar nova exposição
  async createExhibition(name: string, description: string): Promise<Exhibition> {
    const sql = `
      INSERT INTO exhibition (name, description)
      VALUES (?, ?)
    `;
    
    const result = await this.db.query(sql, [name, description]);
    
    return {
      exhibition_id: result.insertId,
      name,
      description
    };
  }

  // Atualizar exposição existente
  async updateExhibition(id: number, name: string, description: string): Promise<{ success: boolean }> {
    const sql = `
      UPDATE exhibition
      SET name = ?, description = ?
      WHERE exhibition_id = ?
    `;
    
    const result = await this.db.query(sql, [name, description, id]);
    
    return {
      success: result.affectedRows > 0
    };
  }

  // Excluir exposição
  async deleteExhibition(id: number): Promise<{ success: boolean }> {
    const sql = `DELETE FROM exhibition WHERE exhibition_id = ?`;
    const result = await this.db.query(sql, [id]);
    
    return {
      success: result.affectedRows > 0
    };
  }

  // Listar obras de arte em uma exposição
  async listArtsByExhibition(exhibitionId: number): Promise<any[]> {
    const sql = `
      SELECT a.*, ea.exhibition_art_id
      FROM art a
      JOIN exhibition_art ea ON a.art_id = ea.art_id
      WHERE ea.exhibition_id = ?
    `;
    return await this.db.query(sql, [exhibitionId]);
  }

  // Adicionar obra de arte a uma exposição
  async addArtToExhibition(exhibitionId: number, artId: number): Promise<ExhibitionArt> {
    const sql = `
      INSERT INTO exhibition_art (exhibition_id, art_id)
      VALUES (?, ?)
    `;
    
    const result = await this.db.query(sql, [exhibitionId, artId]);
    
    return {
      exhibition_art_id: result.insertId,
      exhibition_id: exhibitionId,
      art_id: artId
    };
  }

  // Remover obra de arte de uma exposição
  async removeArtFromExhibition(exhibitionId: number, artId: number): Promise<{ success: boolean }> {
    const sql = `
      DELETE FROM exhibition_art 
      WHERE exhibition_id = ? AND art_id = ?
    `;
    
    const result = await this.db.query(sql, [exhibitionId, artId]);
    
    return {
      success: result.affectedRows > 0
    };
  }
}
