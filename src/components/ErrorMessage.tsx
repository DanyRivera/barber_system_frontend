import type React from "react"

type ErrorMessageType = {
  children: React.ReactNode
}

const ErrorMessage = ({children} : ErrorMessageType) => {
  return (
    <div className="bg-red-500 text-secondary py-2  text-center rounded my-2 text-xs">
      <p>{children}</p>
    </div>
  )
}

export default ErrorMessage
