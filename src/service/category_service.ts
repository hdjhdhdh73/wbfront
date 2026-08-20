import type { Category, CategoryCreate } from "../types/category"; 
export async function getCategories(): Promise<Category[]> {
    const result = await fetch("/api/categories", { 
        method: "GET",
        headers: { "Content-Type": "application/json" } 
    }); 
    if (!result.ok) { 
        const error = await result.json(); 
        throw new Error(error.detail || "Ошибка получения категорий"); }
    const categories: Category[] = await result.json();
    return categories;
}
export async function createCategory(data: CategoryCreate): Promise<Category> { 
    const result = await fetch("/api/categories", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data) 
    }); 
    if (!result.ok) { 
        const error = await result.json();
        throw new Error(error.detail || "Ошибка создания категории"); } 
    const category: Category = await result.json();
    return category; 
}
