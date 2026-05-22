export const PASSWORD_TOGGLE_LABEL = {
  show: 'Показать пароль',
  hide: 'Скрыть пароль',
} as const

export const PASSWORD_MIN_LENGTH = 8

export const PASSWORD_VALIDATION_ERRORS = {
  required: 'Введите пароль',
  minLength: `Пароль должен быть не короче ${PASSWORD_MIN_LENGTH} символов`,
} as const

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const EMAIL_VALIDATION_ERRORS = {
  required: 'Введите email',
  invalid: 'Некорректный email',
} as const
