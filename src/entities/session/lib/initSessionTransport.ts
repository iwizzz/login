import { createBaseQuery, initBaseApi } from '@/shared/api'
import { selectAccessToken } from '../model/selectors'
import type { StateWithSession } from '../model/selectors'
import { withReauth } from './reauthHandler'

export function initSessionTransport(): void {
  const baseQuery = createBaseQuery({
    getAccessToken: (state) => selectAccessToken(state as StateWithSession),
  })

  initBaseApi(withReauth(baseQuery))
}
