import { useState } from "react";
import { Link } from "react-router-dom"; 
import { addToCart } from "../../service/cart_service";
import type { Product } from "../../types/product";
import styles from "./ProductCard.module.css";
export function ProductCard({ product }: { product: Product }) {

  const [added, setAdded] = useState(false);
  const handleClick = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Сначала войдите в аккаунт"); 
      }
    else {
    addToCart(Number(userId), { product_id: product.id, quantity: 1 })
    .then(() => { 
      setAdded(true); setTimeout(() => setAdded(false), 2000); })
    .catch((erorr) => { alert(erorr.message); })};
};
  return (

    <div className={styles.card}>
      <Link to={"/product/" + product.id} className={styles.link}>
        <div className={styles.imageWrapper}>
          <img src="/placeholder.png" alt={product.name} className={styles.image} />
        </div>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{product.price} руб.</p>
        <p className={styles.description}>{product.description}</p>
      </Link>

      <button className={styles.button} onClick={handleClick} disabled={added}>
        {added ? "Добавлено" : "В корзину"} 
      </button>
    </div>

  );
}
