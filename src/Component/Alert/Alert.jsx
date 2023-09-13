import React from 'react'
import AlertView from './AlertView'

function Alert({type,message}) {
  return (
    <>
    <AlertView type={type} message = {message}/>
    </>
  )
}

export default Alert