export const USERNAME_MIN_LENGTH = 2

export const USERNAME_VALIDATION_ERRORS = {
  required: 'Введите никнейм',
  minLength: `Никнейм должен быть не короче ${USERNAME_MIN_LENGTH} символов`,
} as const
