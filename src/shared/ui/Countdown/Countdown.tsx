import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

export type CountdownRenderProps = {
  secondsLeft: number
  isFinished: boolean
  isRunning: boolean
  restart: (seconds?: number) => void
  start: () => void
  pause: () => void
}

export type CountdownProps = {
  seconds: number
  autoStart?: boolean
  onComplete?: () => void
  children: (props: CountdownRenderProps) => ReactNode
}

export function Countdown({
  seconds,
  autoStart = true,
  onComplete,
  children,
}: CountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(seconds)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<number | null>(null)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  const restart = useCallback(
    (nextSeconds = seconds) => {
      clearTimer()
      setSecondsLeft(nextSeconds)
      setIsRunning(true)
    },
    [seconds, clearTimer],
  )

  useEffect(() => {
    if (!isRunning) {
      return
    }

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer()
          setIsRunning(false)
          onCompleteRef.current?.()
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return clearTimer
  }, [isRunning, clearTimer])

  const renderProps: CountdownRenderProps = {
    secondsLeft,
    isFinished: secondsLeft === 0,
    isRunning,
    restart,
    start,
    pause,
  }

  // Render-prop API; callbacks are stable and do not read refs during render.
  // eslint-disable-next-line react-hooks/refs -- false positive for render-prop children
  return children(renderProps)
}
