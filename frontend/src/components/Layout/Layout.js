import React from 'react'
import Header1 from './Header1'
import Footer1 from './Footer1'
import { Helmet } from "react-helmet"
//import { ToastContainer} from "react-toastify";
import { Toaster } from "react-hot-toast"
//import 'react-toastify/dist/ReactToastify.css'

const Layout = ({children, title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name = "description" content = { description } />
        <meta name = "keywords" content = { keywords } />
        <meta name = "author" content = { author } />
        <title>{ title }</title>
      </Helmet>
        <Header1/>
        <main style={{minHeight: '80vh'}}>
        <Toaster/>
            {children}
        </main>
        <Footer1/>
    </div>
  )
}

Layout.defaultProps = {
  title: "Serendib Plaza - Shopping mall app",
  description: "Mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "SE-S1-WD-04"
}

export default Layout