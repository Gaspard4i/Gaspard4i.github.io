interface SkeletonBoxProps {
  className?: string
  count?: number
}

export default function SkeletonBox({ className = 'h-4 w-full', count = 1 }: SkeletonBoxProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`skeleton ${className}`} />
      ))}
    </>
  )
}
