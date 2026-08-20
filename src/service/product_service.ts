import type { Product, ProductCreate } from "../types/product"; 
export async function getProducts(category_id?: number, keyword_search?: string): Promise<Product[]> { 
    const url_param = new URLSearchParams();

    if (category_id) { url_param.append("category_id", String(category_id)); }
    if (keyword_search) { url_param.append("keyword", keyword_search); }

    const api = `/api/products?${url_param.toString()}`; 
    const result = await fetch(api, { 
        method: "GET",
         headers: { "Content-Type": "application/json" } 
        });
    if (!result.ok) {
         const error = await result.json();
         throw new Error(error.detail || "Ошибка получения товаров"); } 
    const products: Product[] = await result.json();
    return products;
}
export async function getProductById(product_id: number): Promise<Product> {
    const result = await fetch(`/api/products/${product_id}`, { 
        method: "GET",
        headers: { "Content-Type": "application/json" } 
    }); 
    if (!result.ok) {
         const error = await result.json(); 
         throw new Error(error.detail || "Ошибка получения товара"); } 
    const product: Product = await result.json();
    return product;
}
export async function createProduct(data: ProductCreate): Promise<Product> { 
    const result = await fetch("/api/products", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data) 
    }); 
    if (!result.ok) { 
        const error = await result.json(); 
        throw new Error(error.detail || "Ошибка создания товара"); } 
    const product: Product = await result.json(); 
    return product; 
}
export async function deleteProduct(product_id: number): Promise<void> { 
    const result = await fetch(`/api/products/${product_id}`, { 
        method: "DELETE" }); 
    if (!result.ok) { 
        const error = await result.json(); 
        throw new Error(error.detail || "Ошибка удаления товара"); } 
}

