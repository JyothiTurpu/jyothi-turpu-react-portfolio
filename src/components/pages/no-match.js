import React from 'react'
import { Link } from 'react-router-dom'

export default function NoMatch() {
  return (
    <div>
      <h2>Sorry! No Such Page Exists!</h2>
      <Link to='/'>Return to HomePage</Link>
    </div>
  )
}
