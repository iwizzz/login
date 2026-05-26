export type ApiError = {
  message: string
  statusCode: number
  description: string
}

/** Ошибка RTK Query / fetchBaseQuery при `.unwrap()` */
export type AppError = {
  status:
    | number
    | 'FETCH_ERROR'
    | 'PARSING_ERROR'
    | 'TIMEOUT_ERROR'
    | 'CUSTOM_ERROR'
  data: ApiError
}

export function isApiError(value: unknown): value is ApiError {
  if (!value || typeof value !== 'object') {
    return false
  }

  const maybeError = value as Partial<ApiError>

  return (
    typeof maybeError.message === 'string' &&
    typeof maybeError.description === 'string' &&
    typeof maybeError.statusCode === 'number'
  )
}

export function getApiError(value: unknown): ApiError | undefined {
  if (!value || typeof value !== 'object' || !('data' in value)) {
    return undefined
  }

  const { data } = value as AppError

  return isApiError(data) ? data : undefined
}
