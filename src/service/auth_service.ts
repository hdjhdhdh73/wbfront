import type { UserCreate, UserLogin, LoginResponse } from "../types/auth";
export async function registerUser(data: UserCreate): Promise<LoginResponse> {
    const result = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }); 
    if (!result.ok) {
        const error = await result.json();
        throw new Error(error.detail || "Ошибка регистрации");}
    const login_response: LoginResponse = await result.json();
    return login_response;
}
export async function loginUser(data: UserLogin): Promise<LoginResponse> {
    const result = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!result.ok) { 
        const error = await result.json();
        throw new Error(error.detail || "Ошибка авторизации"); }
    const login_response: LoginResponse = await result.json();
    return login_response;
}
