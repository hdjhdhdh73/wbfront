import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsAuthenticated(!!userId);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/catalog" className={styles.logo}>WC</Link>
        <div className={styles.actions}>
          <Link to="/cart" className={styles.cartLink}>Корзина</Link>
          {isAuthenticated ? (
            <>
              {localStorage.getItem("userRole") === "admin" && (
                <Link to="/admin" className={styles.buttons}>Админ</Link>
              )}
              <button className={styles.buttons} onClick={logout}>Выйти</button></>) : (
            <>
              <Link to="/login" className={styles.buttons}>Войти</Link>
              <Link to="/register" className={styles.buttons}>Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
