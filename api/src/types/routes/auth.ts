export interface AuthLoginBody {
    email: string;
    password: string;
}

export interface AuthLoginResponse {
    id: string;
    username: string;
    email: string;
}