export default function TabStage({ activeKey, direction = 'left', className = '', children }) {
  const motionClass =
    direction === 'left'
      ? 'animate-slide-in-left'
      : direction === 'right'
        ? 'animate-slide-in-right'
        : 'animate-fade-up'

  return (
    <div key={activeKey} className={`w-full ${motionClass} ${className}`}>
      {children}
    </div>
  )
}
