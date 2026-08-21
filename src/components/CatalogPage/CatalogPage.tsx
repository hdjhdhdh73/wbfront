import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getProducts } from "../../service/product_service";
import { getCategories } from "../../service/category_service";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import type { Category } from "../../types/category";
import type { Product } from "../../types/product";
import styles from "./CatalogPage.module.css";

export function CatalogPage() {
  const [params] = useSearchParams();
  const categoryId = params.get("category_id") ? Number(params.get("category_id")) : undefined;
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { getCategories().then((data) =>
     setCategories(data)).catch(() => {})}, []);
  useEffect(() => {
     setLoading(true);
     setError("");
      getProducts(categoryId, searchText || undefined)
      .then((data) => { setProducts(data);
         setLoading(false)})
      .catch((error) => { setError(error.message); setLoading(false)})
    }, [categoryId, searchText]);
  const selectCategory = (id: number) => {
    navigate("/catalog?category_id=" + id);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <div className={styles.categoryButtons}>
          <button className={styles.categoryButton} onClick={() => navigate("/catalog")}>Все</button>

          {categories.map((category) => (
            <button key={category.id} className={styles.categoryButton + (categoryId === category.id ? " " + styles.activeCat : "")}
             onClick={() => selectCategory(category.id)}> {category.name} </button>))}
        </div>

        <input type="text" placeholder="Поиск товаров..." value={searchText} onChange={(event) =>
           setSearchText(event.target.value)} className={styles.searchInput} />

        {loading && <p>Загрузка товаров...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && products.length === 0 && <p>Товары не найдены</p>}
        <div className={styles.grid}> {products.map((product) =>
          (<ProductCard key={product.id} product={product} />)
          )}
          </div>
      </div>
    </main>
  );
}
