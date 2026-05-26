export const AUTH_PATHS = {
  login: '/auth/login',
  signUp: '/auth/signUp',
  sendResetPassword: '/auth/send-reset-password',
  refresh: '/auth/refresh',
  logout: '/auth/logout',
} as const

export const AUTH_SKIP_PATHS = [
  AUTH_PATHS.login,
  AUTH_PATHS.signUp,
  AUTH_PATHS.sendResetPassword,
  AUTH_PATHS.refresh,
  AUTH_PATHS.logout,
] as const
