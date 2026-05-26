import { injectSessionApi } from './api/sessionApi'

type SessionApi = ReturnType<typeof injectSessionApi>

let sessionApi: SessionApi | undefined

export function registerSessionApi(): void {
  if (!sessionApi) {
    sessionApi = injectSessionApi()
  }
}

function getSessionApi(): SessionApi {
  if (!sessionApi) {
    throw new Error(
      'sessionApi не зарегистрирован: вызовите registerSessionApi() после initSessionTransport().',
    )
  }
  return sessionApi
}

export function useLazyLogoutQuery(
  ...args: Parameters<SessionApi['useLazyLogoutQuery']>
) {
  return getSessionApi().useLazyLogoutQuery(...args)
}

export function useLazyRefreshQuery(
  ...args: Parameters<SessionApi['useLazyRefreshQuery']>
) {
  return getSessionApi().useLazyRefreshQuery(...args)
}
