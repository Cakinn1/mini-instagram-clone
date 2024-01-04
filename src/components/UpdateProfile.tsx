import React from 'react'
import { useParams } from 'react-router-dom'

export default function UpdateProfile() {
    const {username} = useParams()
    console.log(username)
  return (
    <div className='text-white'>UpdateProfile</div>
  )
}
