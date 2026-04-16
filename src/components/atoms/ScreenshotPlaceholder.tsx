import { ImagePlus } from 'lucide-react'

interface ScreenshotPlaceholderProps {
  label: string
  className?: string
}

export default function ScreenshotPlaceholder({ label, className = '' }: ScreenshotPlaceholderProps) {
  return (
    <div className={`border-2 border-dashed border-base-300 rounded-xl bg-base-200 flex flex-col items-center justify-center gap-3 py-12 px-6 ${className}`}>
      <ImagePlus size={32} className="text-base-content/30" />
      <span className="text-sm text-base-content/40 text-center">{label}</span>
    </div>
  )
}
