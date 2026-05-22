import type { User } from "@/entities/user"

export type LoginRequest = {
    login: string
    password: string
}
export type SignupRequest = {
    username: string,
    password: string,
    email: string,
    phone: string,
    country: string,
    city: string,
    birthday: string,
    address: string,
    avatarUrl: string,
    refId: string
}
  
  
export type EnterResponse = {
    access_token: string,
    user: User, 
}

export type LogoutResponse = {
    message: string,
    description: string,
    statusCode: 401 | 404,
}
  