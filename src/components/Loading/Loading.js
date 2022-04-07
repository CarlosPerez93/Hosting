import React from 'react'
import LoadingIcon from '../../assets/img/Loading.svg'
export const Loading = ({visible}) => {
  return (
    <div className="loading" style={ visible===true?{display:'flex'}:{display:'none'}} > 
    <img alt="loading" src={LoadingIcon}/>
      
    </div>
  )
}
