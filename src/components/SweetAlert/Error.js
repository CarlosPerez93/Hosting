
import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
export const modalError = ({ message }) => (
  MySwal.fire({
    icon: 'error',
    title: <p>Tenemos un error</p>,
    heightAuto: 'false',
    didOpen: () => {
      MySwal.clickConfirm()
    }
  }).then(() => {
     MySwal.fire(<p>{message}</p>)
  
  })
)