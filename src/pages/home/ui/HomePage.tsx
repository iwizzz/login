import { logout, useLazyLogoutQuery } from '@/entities/session'
import { useAppDispatch } from '@/app/store'

export function HomePage() {
  const dispatch = useAppDispatch()
  const [logoutRequest, { isFetching }] = useLazyLogoutQuery()

  const handleLogout = async () => {
    try {
      await logoutRequest().unwrap()
      dispatch(logout())

    } catch {
    } 
  }

  return (
    <section>
      <h1>Главная</h1>
      <p>Вы вошли</p>

      <button type="button" onClick={() => void handleLogout()} disabled={isFetching}>
        Выйти
      </button>
    </section>
  )
}
