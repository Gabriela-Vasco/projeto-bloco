import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1>Cadastro</h1>

      <div>
        <input
          type="text"
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
        <br />
        <input
          type="password"
          placeholder="Confirme a Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
      </div>

      {error && <p>{error}</p>}

      <button
        onClick={handleSignup}
        style={styles.buttonPrimary}
      >
        Cadastrar
      </button>

      <button
        onClick={() => navigate("/login")}
        style={styles.buttonSecondary}
      >
        Ir para Login
      </button>
    </div>
  );
}
