import { Outlet, useMatches } from 'react-router-dom'
import {
  AuthFormCard,
  type AuthFormCardVariant,
} from '@/widgets/auth-form-card'
import { AUTH_BENEFITS } from './model/benefits'
import styles from './AuthLayout.module.scss'

type AuthRouteHandle = {
  authFormVariant: AuthFormCardVariant
}

function resolveAuthFormVariant(
  matches: ReturnType<typeof useMatches>,
): AuthFormCardVariant {
  for (let i = matches.length - 1; i >= 0; i--) {
    const handle = matches[i].handle as AuthRouteHandle | undefined
    if (handle?.authFormVariant) {
      return handle.authFormVariant
    }
  }

  return 'login'
}

export function AuthLayout() {
  const matches = useMatches()
  const variant = resolveAuthFormVariant(matches)

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar} aria-label="О Yeahub">
        <header className={styles.brand}>
          <div className={styles.brandRow}>
            <span className={styles.logoSlot} aria-hidden />
            <span className={styles.brandName}>Yeahub</span>
          </div>
          <p className={styles.tagline}>Yeahub объединяет IT-специалистов</p>
        </header>

        <div className={styles.benefits}>
          <h2 className={styles.benefitsTitle}>
            Стань частью сообщества Yeahub и получи:
          </h2>
          <ul className={styles.benefitsList}>
            {AUTH_BENEFITS.map((item) => (
              <li key={item} className={styles.benefitItem}>
                <span className={styles.checkSlot} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={styles.main}>
        <AuthFormCard variant={variant}>
          <Outlet />
        </AuthFormCard>
      </main>
    </div>
  )
}
