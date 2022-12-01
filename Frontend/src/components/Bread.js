import React from 'react'

const Bread = ({item,handleNewAddress,current_address}) => {
  return (
      <div style={{boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.35)',margin:'5px',display: 'flex',alignItems: 'center',justifyContent: 'center',cursor: 'pointer',minWidth:'70px',borderRadius: '10px' }} onClick={event=>handleNewAddress(current_address)}>
          {
              item
          }
    </div>
  )
}

export default Bread