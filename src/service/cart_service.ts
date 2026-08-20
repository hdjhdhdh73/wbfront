import type { CartItem, CartItemCreate } from "../types/cart"; 
export async function getCart(user_id: number): Promise<CartItem[]> {
    const result = await fetch(`/api/cart?user_id=${user_id}`,{
        method: "GET",
        headers: { "Content-Type": "application/json" } 
    });
    if (!result.ok) { 
        const error = await result.json(); 
        throw new Error(error.detail || "Ошибка получения корзины"); }
    const cart_items: CartItem[] = await result.json();
    return cart_items;
}
export async function addToCart(user_id: number, data: CartItemCreate): Promise<CartItem> {
    const result = await fetch(`/api/cart/items?user_id=${user_id}`,{ 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data) });
    if (!result.ok) { 
        const error = await result.json(); 
        throw new Error(error.detail || "Ошибка добавления в корзину"); }
    const cart_item: CartItem = await result.json();
    return cart_item;
}
export async function removeFromCart(item_id: number, user_id: number): Promise<void> { 
    const result = await fetch(`/api/cart/items/${item_id}?user_id=${user_id}`, { 
        method: "DELETE" 
    });
    if (!result.ok) { 
        const error = await result.json(); 
        throw new Error(error.detail || "Ошибка удаления из корзины"); } 
}

