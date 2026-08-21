import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, createProduct, deleteProduct } from "../../service/product_service";
import { getCategories, createCategory } from "../../service/category_service";
import type { Product } from "../../types/product";
import type { Category } from "../../types/category";
import styles from "./AdminPage.module.css";

export function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cat_name, setCat_name] = useState("");
  const [selected_cat, setSelected_cat] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    getProducts().then((data) => setProducts(data)).catch(() => {});
    getCategories().then((data) => setCategories(data)).catch(() => {});
  }, [navigate]);
  const handleSave = () => {
    const data = { name, price: Number(price), description, category_id: Number(selected_cat), image_url: imageUrl };
    createProduct(data).then((new_product) => {
      setProducts((list) => [...list, new_product]);
    });
    setName("");
    setPrice("");
    setDescription("");
    setImageUrl("");
  };
  const handleDelete = (id: number) => {
    deleteProduct(id).then(() => {
      setProducts((list) => list.filter((product) => product.id !== id));
    });
  };
  const handleAddCategory = () => {
    if(!cat_name){
      return;
    }
    createCategory({ name: cat_name }).then((new_cat) => {
      setCategories((list) => [...list, new_cat]);
      setCat_name("");
    });
  }
  return (
    <div className={styles.container}>
      <h2>Админ-панель</h2>
      <button onClick={() => navigate("/")}>На главную</button>
      <h3>Товары</h3>
      <input type="text" placeholder="Название" value={name} onChange={(event) => setName(event.target.value)} />
      <input type="number" placeholder="Цена" value={price} onChange={(event) => setPrice(event.target.value)} />
      <textarea placeholder="Описание" value={description} onChange={(event) => setDescription(event.target.value)} />
      <input type="text" placeholder="URL картинки" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
      <select value={selected_cat} onChange={(event) => setSelected_cat(event.target.value)}>
        <option value="">Выберите категорию</option>
        {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </select>
      <button className={styles.addButton} onClick={handleSave}>Добавить</button>
      <div className={styles.list}>
        {products.map((product) => (
          <div key={product.id} className={styles.item}>
            <span>{product.name} - {product.price} руб.</span>
            <div>
              <button onClick={() => handleDelete(product.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
      <h3>Категории</h3>
      <div className={styles.cat_form}>
        <input type="text" placeholder="Название категории" value={cat_name} onChange={(event) => setCat_name(event.target.value)} />
        <button onClick={handleAddCategory}>Добавить</button>
      </div>
      <div className={styles.list}>
        {categories.map((cat) => (
          <div key={cat.id} className={styles.item}>
            <span>{cat.name} (ID: {cat.id})</span>
          </div>
        ))}
      </div>
    </div>
  );

}
