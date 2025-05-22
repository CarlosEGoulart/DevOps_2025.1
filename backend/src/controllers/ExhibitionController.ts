// Modelo para Exposição
export interface Exhibition {
  id?: number;
  name: string;
  date: string;
  location: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Classe para manipulação de exposições
export default class ExhibitionController {
  private db: any;

  constructor(database: any) {
    this.db = database;
  }

  // Listar todas as exposições
  async listExhibitions(): Promise<Exhibition[]> {
    const sql = `SELECT * FROM exhibitions ORDER BY date DESC`;
    return await this.db.query(sql);
  }

  // Buscar exposição por ID
  async getExhibition(id: number): Promise<Exhibition | null> {
    const sql = `SELECT * FROM exhibitions WHERE id = ?`;
    return await this.db.get(sql, [id]);
  }

  // Criar nova exposição
  async createExhibition(name: string, date: string, location: string, description: string): Promise<Exhibition> {
    const sql = `
      INSERT INTO exhibitions (name, date, location, description)
      VALUES (?, ?, ?, ?)
    `;
    
    const result = await this.db.run(sql, [name, date, location, description]);
    
    return {
      id: result.lastID,
      name,
      date,
      location,
      description
    };
  }

  // Atualizar exposição existente
  async updateExhibition(id: number, name: string, date: string, location: string, description: string): Promise<{ success: boolean }> {
    const sql = `
      UPDATE exhibitions
      SET name = ?, date = ?, location = ?, description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const result = await this.db.run(sql, [name, date, location, description, id]);
    
    return {
      success: result.changes > 0
    };
  }

  // Excluir exposição
  async deleteExhibition(id: number): Promise<{ success: boolean }> {
    const sql = `DELETE FROM exhibitions WHERE id = ?`;
    const result = await this.db.run(sql, [id]);
    
    return {
      success: result.changes > 0
    };
  }
}
