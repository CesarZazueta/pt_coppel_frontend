import clsx from 'clsx'
import { X } from 'lucide-react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  direction?: 'left' | 'right' | 'bottom'
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  direction = 'right',
}) => {
  // Drawer position classes based on direction
  const positionClasses =
    direction === 'left'
      ? 'left-0 top-0 h-full'
      : direction === 'right'
        ? 'right-0 top-0 h-full'
        : 'bottom-0 left-0 w-full'

  // Animation classes based on direction
  const translateClasses =
    direction === 'left'
      ? isOpen
        ? 'translate-x-0'
        : '-translate-x-full'
      : direction === 'right'
        ? isOpen
          ? 'translate-x-0'
          : 'translate-x-full'
        : isOpen
          ? 'translate-y-0'
          : 'translate-y-full'

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={clsx(
          'fixed z-50 flex transform flex-col bg-white shadow-2xl transition-transform duration-300',
          positionClasses,
          translateClasses,
        )}
        style={{
          width: direction === 'bottom' ? '100%' : '30rem',
          maxWidth: direction === 'bottom' ? '100%' : undefined,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}

        <div className="mx-auto w-full max-w-3xl p-4">{children}</div>
      </div>
    </>
  )
}

export default Drawer