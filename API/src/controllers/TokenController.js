import jwt from 'jsonwebtoken';
import User from '../models/Cliente';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await User.buscarByEmail(email);

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    console.log(user);

    if (!(await User.passwordIsValid(password, user.password_hash))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { nome: user.nome, id, email } });
  }
}

export default new TokenController();