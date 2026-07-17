import { ReactNode } from 'react'

type ExampleFrameProps = {
  children: ReactNode
  className?: string
  title?: string
}

export default function ExampleFrame({
  children,
  className = '',
  title = 'Render',
}: ExampleFrameProps) {
  return (
    <div
      className={`not-prose dark:border-primary-800 relative rounded-2xl border p-6 ${className}`}
    >
      <div className="dark:text-primary-800 absolute -top-3 left-4 rounded bg-white px-2 text-sm font-medium text-gray-400 uppercase dark:bg-gray-900">
        {title}
      </div>
      {children}
    </div>
  )
}
