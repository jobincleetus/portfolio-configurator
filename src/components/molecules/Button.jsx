import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({data, isDisabled}) => {
  return (
    <>
      {
        !data.url 
        ?
        <div disabled={isDisabled} onClick={data.handleClick} className={`py-2 px-6 rounded-full inline-block ${data.type === 'button' ? 'bg-secondary text-white' : '' } ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}>
            {data.title}
        </div>
        :
        <Link disabled={isDisabled} to={`${data.url}`} className={`py-2 px-6 rounded-full inline-block ${data.type === 'button' ? 'bg-secondary text-white' : '' } ${isDisabled ? 'opacity-50' : 'cursor-pointer'}`}>
            {data.title}
        </Link>
      }
    </>
  )
}

export default Button
