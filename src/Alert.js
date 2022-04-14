import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert, list}) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        }, 2000);
        return () => clearTimeout(timeout)
    }, [list])
  return (
    <p className={`products__alert ${type}`}>{msg}</p>
  )
}

export default Alert
