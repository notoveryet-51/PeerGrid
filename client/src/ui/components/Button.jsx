export default function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 ${className}`}
    >
      {children}
    </button>
  )
}
