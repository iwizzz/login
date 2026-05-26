import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AUTH_FORM_PAGE_CONFIG, type AuthFormCardVariant } from '../model/pageConfig'
import styles from './AuthFormCard.module.scss'

type AuthFormCardProps = {
  children: ReactNode
  variant: AuthFormCardVariant
}

export function AuthFormCard({ children, variant }: AuthFormCardProps) {
  const page = AUTH_FORM_PAGE_CONFIG[variant]

  return (
    <div className={styles.card}>
      <header className={styles.mobileBrand}>
        <span className={styles.logoSlot} aria-hidden />
        <span className={styles.mobileBrandName}>Yeahub</span>
      </header>

      <h1 className={styles.title}>{page.title}</h1>

      {page.showDescription && 'description' in page && (
        <p className={styles.description}>{page.description}</p>
      )}

      {children}

      {page.showSocial && (
        <section className={styles.social} aria-label="Вход через соцсети">
          <p className={styles.socialText}>
            Зарегистрироваться через социальные сети
          </p>
          <ul className={styles.socialList}>
            <li>
              <button
                type="button"
                className={styles.socialSlot}
                aria-label="Telegram"
              />
            </li>
            <li>
              <button
                type="button"
                className={styles.socialSlot}
                aria-label="Google"
              />
            </li>
            <li>
              <button
                type="button"
                className={styles.socialSlot}
                aria-label="Facebook"
              />
            </li>
          </ul>
        </section>
      )}

      <footer className={styles.footer}>
        <p className={styles.footerText}>{page.footerText}</p>
        <Link className={styles.footerLink} to={page.footerLinkTo}>
          {page.footerLinkLabel}
        </Link>
      </footer>
    </div>
  )
}
