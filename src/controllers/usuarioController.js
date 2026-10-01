import * as usuarioModel from "../models/usuarioModel.js";

export const listar = async (req, res) => {
  try {
    const usuarios = await usuarioModel.listarUsuarios();
    res.json(usuarios);
  } catch (e) {
    res.status(500).json({ erro: "Falha ao listar usuários" });
  }
};

export const criar = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const novoUsuario = await usuarioModel.criarUsuario(nome, email);
    res.status(201).json(novoUsuario);
  } catch (e) {
    res.status(500).json({ erro: "Falha ao criar usuário" });
  }
};

export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;
    
    const affectedRows = await usuarioModel.atualizarUsuario(id, nome, email);
    
    if (!affectedRows) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    
    res.json({ mensagem: "Atualizado com sucesso" });
  } catch (e) {
    res.status(500).json({ erro: "Falha ao atualizar usuário" });
  }
};

export const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await usuarioModel.deletarUsuario(id);
    
    if (!affectedRows) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    
    res.json({ mensagem: "Deletado com sucesso" });
  } catch (e) {
    res.status(500).json({ erro: "Falha ao deletar usuário" });
  }
};