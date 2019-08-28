export interface LoginData {
    username: string;
    password: string;
}

export interface ID {
    id_token: string;
}

export interface AuthResponse {
    is_authenticated: boolean;
    message?: string;
}
