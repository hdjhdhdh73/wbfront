import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart, removeFromCart, updateCartItem } from "../../service/cart_service";
import type { CartItem } from "../../types/cart";
import styles from "./CartPage.module.css";
export function CartPage() {

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorData, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    if (!user_id) {
      navigate("/login");
      return
    }
    getCart(Number(user_id))
      .then((data) => {
        setCart(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

  }, [navigate]);

  const handleRemove = (cartId: number) => {
    const user_id = localStorage.getItem("userId");
    if (!user_id) {
      return
    };
    removeFromCart(cartId, Number(user_id))
      .then(() => {
        setCart((listcart) => listcart.filter((item) => item.id !== cartId));
      })
      .catch((err) => {
        alert((err as Error).message);
      });
  };

  const handleQuantity = (cartID: number, change: number) => {
    const user_id = localStorage.getItem("userId");
    if (!user_id) {
      return
    };
    const product_cart = cart.find((item) => item.id === cartID);
    if (!product_cart) {
      return
    };
    const change_quantity = product_cart.quantity + change;
    if (change_quantity < 1) {
      return
    };
    updateCartItem(cartID, Number(user_id), change_quantity)
      .then(() => {
        setCart((listcart) =>
          listcart.map((item) =>
            item.id === cartID
              ? { ...item, quantity: change_quantity, total_price: item.product_price * change_quantity }
              : item
          )
        );
      })
      .catch((error) => {
        alert((error as Error).message);
      });
  };

  const total = cart.reduce((sum, item) => sum + item.total_price, 0);
  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }
  if (errorData) {
    return <div className={styles.error}>Ошибка: {errorData}</div>;
  }
  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Корзина пуста</h2>
        <Link to="/">На главную</Link>
      </div>
    );
  }

  return (

    <div className={styles.container}>
      <h2>Корзина</h2>
      <div className={styles.list}>
        {cart.map((item) => (
          <div key={item.id} className={styles.item}>
            <span className={styles.itemName}>{item.product_name}</span>
            <span className={styles.itemPrice}>{item.product_price} руб. x {item.quantity}</span>
            <span className={styles.itemTotal}>= {item.total_price} руб.</span>

            <div className={styles.quantityButtons}>
              <button className={styles.quantityButton} onClick={() => handleQuantity(item.id, -1)}>-</button>
              <span className={styles.quantityValue}>{item.quantity}</span>
              <button className={styles.quantityButton} onClick={() => handleQuantity(item.id, 1)}>+</button>
            </div>

            <button className={styles.deleteButton} onClick={() => handleRemove(item.id)}>Удалить</button>
          </div>
        ))}
      </div>
      <div className={styles.total}>Итого: {total} руб.</div>
    </div>
  );

}