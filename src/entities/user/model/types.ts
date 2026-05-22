export type Permission = {
  id: number
  name: string
}

export type UserRole = {
  id: number
  name: string
  permissions: Permission[]
}

export type User = {
  id: string
  username: string
  email: string
  phone: string
  country: string
  city: string
  birthday: string
  address: string
  avatarUrl: string
  updatedAt: string
  createdAt: string
  userRoles: UserRole[]
  isVerified: boolean
  isEmailNotificationsEnable: boolean
}
