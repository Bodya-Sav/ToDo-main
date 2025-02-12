import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser(username, password);
      navigate("/todos");
    } catch (err) {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="auth">
      <div>
        <h2>Вход</h2>
      </div>
      <div className="mid">
        <div className="forma">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Войти</button>
          </form>
        </div>
        <div> {error && <p style={{ color: "red" }}>{error}</p>}</div>
      </div>
      <div>
        <p>
          Нет аккаунта? <a href="/register">Регистрация</a>
        </p>
      </div>
    </div>
  );
}
