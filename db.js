import * as SQLite from "expo-sqlite";

let dbInstance = null;

async function getDB() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("produtos.db");
    await dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS Produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome TEXT NOT NULL,
        descricao TEXT,
        preco REAL NOT NULL,
        imagem TEXT
      );
      CREATE TABLE IF NOT EXISTS Carrinho (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL DEFAULT 1
      );
    `);
  }
  return dbInstance;
}

export async function select() {
  const db = await getDB();
  return db.getAllAsync("SELECT * FROM Produtos ORDER BY id DESC;");
}

export async function insert(nome, descricao, preco, imagem) {
  if (!nome || !preco) throw new Error("Nome e preço são obrigatórios.");
  const db = await getDB();
  await db.runAsync(
    "INSERT INTO Produtos (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?);",
    [nome.trim(), descricao || "", preco, imagem || ""]
  );
}

export async function update(id, nome, descricao, preco, imagem) {
  if (!id) throw new Error("ID é obrigatório para atualizar.");
  if (!nome || !preco) throw new Error("Nome e preço são obrigatórios.");
  const db = await getDB();
  await db.runAsync(
    "UPDATE Produtos SET nome = ?, descricao = ?, preco = ?, imagem = ? WHERE id = ?;",
    [nome.trim(), descricao || "", preco, imagem || "", id]
  );
}

export async function remove(id) {
  if (!id) throw new Error("ID é obrigatório para deletar.");
  const db = await getDB();
  await db.runAsync("DELETE FROM Produtos WHERE id = ?;", [id]);
}

// Carrinho
export async function addToCart(produto_id) {
  const db = await getDB();
  // Se já existe, incrementa quantidade
  const item = await db.getFirstAsync("SELECT * FROM Carrinho WHERE produto_id = ?;", [produto_id]);
  if (item) {
    await db.runAsync("UPDATE Carrinho SET quantidade = quantidade + 1 WHERE produto_id = ?;", [produto_id]);
  } else {
    await db.runAsync("INSERT INTO Carrinho (produto_id, quantidade) VALUES (?, 1);", [produto_id]);
  }
}
export async function removeFromCart(produto_id) {
  const db = await getDB();
  const item = await db.getFirstAsync("SELECT * FROM Carrinho WHERE produto_id = ?;", [produto_id]);
  if (item && item.quantidade > 1) {
    await db.runAsync("UPDATE Carrinho SET quantidade = quantidade - 1 WHERE produto_id = ?;", [produto_id]);
  } else {
    await db.runAsync("DELETE FROM Carrinho WHERE produto_id = ?;", [produto_id]);
  }
}
export async function getCart() {
  const db = await getDB();
  return db.getAllAsync(`
    SELECT Carrinho.*, Produtos.nome, Produtos.preco, Produtos.imagem
    FROM Carrinho
    JOIN Produtos ON Produtos.id = Carrinho.produto_id
  `);
}
export async function clearCart() {
  const db = await getDB();
  await db.runAsync("DELETE FROM Carrinho;");
}