import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../service/product_service";
import { addToCart } from "../../service/cart_service";
import type { Product } from "../../types/product";
import styles from "./ProductPage.module.css";

export function ProductPage() {
  const product_id = useParams().id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  useEffect(() => {
    getProductById(Number(product_id))
      .then((data) => {
        setProduct(data);
        setLoading(false); 
      })
      .catch((error) => {
       setError(error.message);
       setLoading(false); 
      });
  }, [product_id]);
  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Сначала войдите в аккаунт");
    }
    if (!product){
      return;
    }
    else{
      addToCart(Number(userId), { product_id: product.id, quantity: 1 })
      .then(() => { setAdded(true); setTimeout(() => setAdded(false), 2000); })
      .catch((error) => { alert(error.message); });
    }
  };

  if (loading) {
    return <div className={styles.container}>Загрузка...</div>; 
  }
  if (error) {
    return <div className={styles.container}>Ошибка: {error}</div>; 
  }
  if (!product) {
    return <div className={styles.container}>Товар не найден</div>; 
  }
  return ( 
    <div className={styles.page}> 
      <div className={styles.container}>
        <Link to="/catalog" className={styles.link}>← Назад к каталогу</Link>
        <div className={styles.content_product}>

          <div className={styles.image}>
            <img src={`http://127.0.0.1:8000/image/${product.image_url}`} alt={product.name} className={styles.mainImage} />
          </div>

          <div className={styles.info_product}>
            <h1>{product.name}</h1>
            <p className={styles.price}>{product.price} руб.</p>
            <p className={styles.description}>{product.description}</p>

            <button className={styles.button} onClick={handleAddToCart} disabled={added}> 
              {added ? "Добавлено в корзину!" : "Добавить в корзину"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
