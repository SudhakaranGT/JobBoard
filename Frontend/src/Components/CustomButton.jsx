import React from 'react'

const CustomButton = ({title,conatainerStyles,iconRight,type,onClick}) => {
  return <button  onClick={onClick}  type={type || "button"} className={`inline-flex items-center ${conatainerStyles}` }>{title}
  {iconRight && div}</button>
}

export default CustomButton
