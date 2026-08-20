import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Добро пожаловать в наш интернет-магазин</h1>
          <p className={styles.subtitle}>
            Широкий ассортимент товаров по доступным ценам. Быстрая доставка, качественный сервис и индивидуальный подход к каждому покупателю.
          </p>
          <Link to="/catalog" className={styles.button}>Перейти в каталог</Link>
        </div>
      </div>
    </div>
  );
}
