import React from 'react'
import Editprofile from './Editprofile'
import { useSelector } from 'react-redux'


const Profile = () => {

  const user = useSelector((store) => store.user)
  
  return (
    <>
    <div>
    {user && (<div><Editprofile user= {user} /></div>)}
    </div>
    </>
  )
}

export default Profile