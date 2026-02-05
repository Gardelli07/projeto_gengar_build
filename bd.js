import * as SQLite from "expo-sqlite";

let dbInstance = null;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("produtos.db");

    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS Usuario (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        login TEXT NOT NULL,
        senha TEXT NOT NULL,
        empresa TEXT NOT NULL,
        tipo TEXT NOT NULL
      );
    `);

    // Inserir usuários padrão (se ainda não existirem)
    await dbInstance.runAsync(
      `INSERT OR IGNORE INTO Usuario (id, login, senha, empresa, tipo)
       VALUES (?, ?, ?, ?, ?)`,
      [1, "admin_santander", "123456", "Santander", "admin"],
    );

    await dbInstance.runAsync(
      `INSERT OR IGNORE INTO Usuario (id, login, senha, empresa, tipo)
       VALUES (?, ?, ?, ?, ?)`,
      [2, "usuario_santander", "123456", "Santander", "usuario"],
    );
  }

  return dbInstance;
}

export default getDB;
