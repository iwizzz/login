import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'
import styles from './Skeleton.module.scss'

export type SkeletonProps = HTMLAttributes<HTMLDivElement>

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(styles.root, className)}
      aria-hidden
      {...props}
    />
  )
}
