import React from 'react'

const Detailpage = ({params}) => {
    const slug = params.slug
  return (
    <div>Detailpage {slug}</div>
  )
}

export default Detailpage