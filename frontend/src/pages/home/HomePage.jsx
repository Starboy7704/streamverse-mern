import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthstore } from '../../store/authUser';

const HomePage = () => {
  const {user} = useAuthstore();
  return (
    <div>
      {user ? <HomeScreen/> : <AuthScreen/>}

    </div>
  )
}

export default HomePage;
