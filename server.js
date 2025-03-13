import express from "express";
import jwt from 'jsonwebtoken';

// Configurando o servidor
const app = express();
const PORT = 3000;
// Configurando a chave de autenticação
const SERCRET_KEY = 'ca7d10e9f937ce3ac4f57a7158db675682150f3f';

// Configurando o corpo da requisição
app.use(exporess.json());

// Dados de exemplo
const users = [
    { id: 1, username: 'usuario1', password: '12345678', role: 'admin' },
    { id: 2, username: 'usuario2', password: '12345678', role: 'user'} 
];

// Rota para realizar a autenticação e gerar o token
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Verificando as credenciais do usuário 
    const user = users.find((u) => u.username === username && u.password === password);
    // Gerando o token se as credenciais forem válidas
    if (user) {
        // Gerando o token com a chave de autenticação e definindo o tempo de expiração
        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SERCRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        // Credenciais inválidas ou usuário não encontrado
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
})
