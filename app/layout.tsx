'use client'

import './globals.css'
import { ThemeProvider } from 'next-themes';

// redux
import { store_0001 } from '../store/store';
import { Provider } from 'react-redux';

// components
import Header from '../components/Header';
import Footer from '../components/Footer';
import NavMenu from '../components/NavMenu'

export default function RootLayout({children, ...rest}: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head />
      <body className={`flex justify-center items-center flex-col relative w-full h-full bg-primary-grey-28 dark:bg-secondary-white viewHeight`}>
          <ThemeProvider attribute='class'>
            <Provider store={store_0001}>
              <Header/>
              <NavMenu/>
              <div className={` 2xl:max-w-[1440px] w-full mt-[10vh] text-secondary-white dark:text-primary-grey px-7 lg:px-0`}>
                {children}
              </div>
              <Footer/>
            </Provider>
          </ThemeProvider>
      </body>
    </html>
  )
}