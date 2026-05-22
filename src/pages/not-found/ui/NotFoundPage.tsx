import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/config'

export function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <p>Страница не найдена.</p>
      <p>
        <Link to={ROUTES.home}>На главную</Link>
      </p>
    </section>
  )
}
