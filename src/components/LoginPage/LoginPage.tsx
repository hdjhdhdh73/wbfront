import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/auth_service";
import styles from "./LoginPage.module.css";


export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    loginUser({ email, password })
      .then((user_data) => {
        localStorage.setItem("userId", String(user_data.user_id));
        
        if (user_data.role) {
           localStorage.setItem("userRole", user_data.role); 
          }
        navigate("/catalog");
      })
      .catch((error) => {
        setError(error.message || "Ошибка входа");
      })
      .finally(() => { setLoading(false); });
  };


  return (
    <main className={styles.page}> 
      <div className={styles.card}> 
        <h1 className={styles.title}>Вход</h1>

        <form onSubmit={handleSubmit}>

          <div className={styles.input}>
            <label>Email</label>
            <input type="email" value={email} onChange={(event) =>
               setEmail(event.target.value)} required placeholder="example@mail.ru" />
          </div>

          <div className={styles.input}>
            <label>Пароль</label>
            <input type="password" value={password} onChange={(event) =>
               setPassword(event.target.value)} required placeholder="Введите пароль" />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitButtton} disabled={loading}>
            {loading ? "Подождите..." : "Войти"}
          </button>

        </form>
        <p className={styles.footer}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </main>
  );
}
