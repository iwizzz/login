export type EnterResponse = {
  access_token: string
  user: {
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
    userRoles: Array<{
      id: number
      name: string
      permissions: Array<{ id: number; name: string }>
    }>
    isVerified: boolean
    isEmailNotificationsEnable: boolean
  }
}

export type AuthToken = Pick<EnterResponse, 'access_token'>

/** GET /auth/logout */
export type LogoutResponse = {
  message: string
}
