import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      setError("");

      if (!email || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Por favor, insira um email válido.");
        return;
      }

      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (email !== storedEmail || password !== storedPassword) {
        setError("Email ou senha incorretos.");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Erro ao iniciar a autenticação:", error);
      setError("Erro ao autenticar. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      {error && <p>{error}</p>}

      <button
        onClick={login}
        disabled={loading}
        style={styles.buttonPrimary}
      >
        {loading ? "Carregando..." : "Entrar"}
      </button>

      <button
        onClick={() => navigate("/signup")}
        style={styles.buttonSecondary}
      >
        Ir para Cadastro
      </button>
    </div>
  );
}