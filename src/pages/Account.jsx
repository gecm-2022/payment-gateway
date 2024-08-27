import React from 'react'
import Dashboard from './Dashborad'
import Data from '../Components/Data'
import Options from '../Components/Options'

const Account = () => {
  return (
    <div className='items-center w-[100vh] m-auto bg-gray-100'>
      <Dashboard/>
      <Data/>
      <Options/>
    </div>
  )
}

export default Account
