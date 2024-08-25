import React from 'react'
import Header1 from './Header1'
import Footer1 from './Footer1'

const Layout = ({children}) => {
  return (
    <div>
        <Header1/>
        <main style={{minHeight: '100vh'}}>
            {children}
        </main>
        <Footer1/>
    </div>
  )
}

export default Layout