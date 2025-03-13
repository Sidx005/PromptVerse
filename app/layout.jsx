
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import Head from '@node_modules/next/head'
// import { SessionProvider } from '@node_modules/next-auth/react'
import '@styles/globals.css'
export const metadata={
    title:"PromptVerse",
    description:'Discover & Sharre AI prompts',
    icons: {
      icon: "/favicon.png", // or "/favicon.png"
    },
}
const layout = ({children}) => {
  return (
    <html lang='en'>
   
    <body>
      <Provider>
        <div className="main">
            <div className="gradient"></div>
        </div>
        <main className="app">
        <Nav/>

          {children}  
        </main>
        </Provider>
    </body>
    </html>
  )
}

export default layout