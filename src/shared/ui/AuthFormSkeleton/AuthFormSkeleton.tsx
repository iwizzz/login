import { Skeleton } from '../Skeleton'
import { authFormStyles } from '@/shared/styles'
import styles from './AuthFormSkeleton.module.scss'

export type AuthFormSkeletonVariant = 'login' | 'signup' | 'resetPassword'

export type AuthFormSkeletonProps = {
  variant?: AuthFormSkeletonVariant
}

const FIELD_COUNTS: Record<AuthFormSkeletonVariant, number> = {
  login: 2,
  signup: 4,
  resetPassword: 1,
}

export function AuthFormSkeleton({
  variant = 'login',
}: AuthFormSkeletonProps) {
  const fieldCount = FIELD_COUNTS[variant]

  return (
    <div
      className={authFormStyles.form}
      aria-busy="true"
      aria-label="Загрузка формы"
    >
      {Array.from({ length: fieldCount }, (_, index) => (
        <div key={index} className={styles.field}>
          <Skeleton className={styles.label} />
          <Skeleton className={styles.input} />
        </div>
      ))}

      {variant === 'login' && (
        <div className={styles.forgotRow}>
          <Skeleton className={styles.forgotLink} />
        </div>
      )}

      <Skeleton className={styles.button} />
    </div>
  )
}
