import React from 'react'
import NavBar from './NavBarPanel'
import { Outlet } from 'react-router-dom'
import store from '../store/store';
import { Provider } from 'react-redux';

const RootLayout = () => {
  return (
    <Provider store={store}>
    <NavBar />

    <main>
        <Outlet />
    </main>
    </Provider>
  )
}

export default RootLayout