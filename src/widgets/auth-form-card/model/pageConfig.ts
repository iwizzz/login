import { ROUTES } from '@/shared/config'

export type AuthFormCardVariant = 'login' | 'signup' | 'resetPassword'

export const AUTH_FORM_PAGE_CONFIG = {
  login: {
    title: 'Вход в личный кабинет',
    footerText: 'Нет аккаунта?',
    footerLinkLabel: 'Зарегистрироваться',
    footerLinkTo: ROUTES.signup,
    showSocial: true,
    showDescription: false,
  },
  signup: {
    title: 'Регистрация',
    footerText: 'Уже есть аккаунт?',
    footerLinkLabel: 'Войти',
    footerLinkTo: ROUTES.login,
    showSocial: true,
    showDescription: false,
  },
  resetPassword: {
    title: 'Забыли пароль?',
    description:
      'Для восстановления пароля введите адрес эл. почты, на который вы регистрировались. Мы отправим письмо для восстановления пароля.',
    footerText: 'Нет аккаунта?',
    footerLinkLabel: 'Зарегистрироваться',
    footerLinkTo: ROUTES.signup,
    showSocial: false,
    showDescription: true,
  },
} as const
