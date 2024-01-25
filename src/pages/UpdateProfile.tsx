import React from 'react'
import { useParams } from 'react-router-dom'

export default function UpdateProfile() {
    const {username} = useParams<string>()
  return (
    <div className='text-white'>UpdateProfile</div>
  )
}
