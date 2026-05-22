import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  EmailInput,
  PasswordInput,
  useLoginMutation,
} from '@/features/auth'
import { setCredentials } from '@/entities/session'
import { useAppDispatch } from '@/app/store'
import { LOGIN_BENEFITS } from '../model/benefits'
import styles from './LoginPage.module.scss'

export function LoginPage() {
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const token = await login({
        login: email || 'demo',
        password: password || 'demo',
      }).unwrap()
      dispatch(setCredentials(token))
    } catch {
      /* login failed */
    }
  }

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
            {LOGIN_BENEFITS.map((item) => (
              <li key={item} className={styles.benefitItem}>
                <span className={styles.checkSlot} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.formCard}>
          <header className={styles.mobileBrand}>
            <span className={styles.logoSlot} aria-hidden />
            <span className={styles.mobileBrandName}>Yeahub</span>
          </header>

          <h1 className={styles.title}>Вход в личный кабинет</h1>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <EmailInput
              value={email}
              onChange={setEmail}
              label="Электронная почта"
              placeholder="Введите электронную почту"
            />
            <PasswordInput
              value={password}
              onChange={setPassword}
              label="Пароль"
              placeholder="Введите пароль"
            />
            <div className={styles.forgotRow}>
              <a className={styles.link} href="#">
                Забыли пароль?
              </a>
            </div>
            <button
              type="submit"
              className={styles.submit}
              disabled={isLoading}
            >
              {isLoading ? 'Вход…' : 'Вход'}
            </button>
          </form>

          <section className={styles.social} aria-label="Вход через соцсети">
            <p className={styles.socialText}>
              Зарегистрироваться через социальные сети
            </p>
            <ul className={styles.socialList}>
              <li>
                <button type="button" className={styles.socialSlot} aria-label="Telegram" />
              </li>
              <li>
                <button type="button" className={styles.socialSlot} aria-label="Google" />
              </li>
              <li>
                <button type="button" className={styles.socialSlot} aria-label="Facebook" />
              </li>
            </ul>
          </section>

          <footer className={styles.footer}>
            <p className={styles.footerText}>Нет аккаунта?</p>
            <Link className={styles.link} to="#">
              Зарегистрироваться
            </Link>
          </footer>
        </div>
      </main>
    </div>
  )
}
