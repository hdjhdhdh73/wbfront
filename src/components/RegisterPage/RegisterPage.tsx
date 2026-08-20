import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../service/auth_service";
import styles from "./RegisterPage.module.css";

export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      await registerUser({ email: email, password: password, first_name: name });
      navigate("/login");
    } 
    catch (error) {
      setError((error as Error).message || "Ошибка регистрации");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт, чтобы покупать товары</p>

        <form onSubmit={handleSubmit}> 
          <div className={styles.input}>
            <label>Имя</label>
            <input type="text" placeholder="Введите ваше имя" onChange={(event) =>
               setName(event.target.value)} />
          </div>

          <div className={styles.input}>
            <label>Email</label>
            <input type="email" placeholder="example@mail.ru" onChange={(event) =>
               setEmail(event.target.value)} />
          </div>

          <div className={styles.input}>
            <label>Пароль</label>
            <input type="password" placeholder="Минимум 6 символов" minLength={6}  onChange={(event) =>
               setPassword(event.target.value)} />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Подождите..." : "Зарегистрироваться"}
          </button>

        </form>
        <p className={styles.footer}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>

      </div>
    </main>
  );
}
