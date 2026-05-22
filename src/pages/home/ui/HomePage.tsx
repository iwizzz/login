import { logout } from '@/entities/session'
import { useAppDispatch } from '@/app/store'

export function HomePage() {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <section>
      <h1>Главная</h1>
      <p>Защищённый маршрут — доступен только после авторизации.</p>

      <button type="button" onClick={handleLogout}>
        Выйти
      </button>

    
    </section>
  )
}
