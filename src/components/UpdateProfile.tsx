import React from 'react'
import { useParams } from 'react-router-dom'

export default function UpdateProfile() {
    const {username} = useParams<string>()
    console.log(username)
  return (
    <div className='text-white'>UpdateProfile</div>
  )
}
