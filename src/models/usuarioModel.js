import { pool } from "../config/db.js";

export const listarUsuarios = async () => {
  const [rows] = await pool.query("SELECT * FROM usuarios");
  return rows;
};

export const criarUsuario = async (nome, email) => {
  const [result] = await pool.query(
    "INSERT INTO usuarios (nome, email) VALUES (?, ?)",
    [nome, email]
  );
  return { id: result.insertId, nome, email };
};

export const atualizarUsuario = async (id, nome, email) => {
  const [result] = await pool.query(
    "UPDATE usuarios SET nome = COALESCE(?, nome), email = COALESCE(?, email) WHERE id = ?",
    [nome || null, email || null, id]
  );
  return result.affectedRows;
};

export const deletarUsuario = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM usuarios WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};