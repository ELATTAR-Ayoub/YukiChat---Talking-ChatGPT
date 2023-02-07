'use client'

import './globals.css'
import { ThemeProvider } from 'next-themes';

// redux
import { store_0001 } from '../store/store';
import { Provider } from 'react-redux';

export default function RootLayout({children, ...rest}: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head />
      <body className={`flex justify-center items-center flex-col relative bg-primary-color-4 w-full h-full dark:bg-secondary-color viewHeight`}>
          <ThemeProvider attribute='class'>
            <Provider store={store_0001}>
              <div className={` 2xl:max-w-[1440px] w-full mt-[10vh] text-secondary-color dark:text-primary-color-4 `}>
                {children}
              </div>
            </Provider>
          </ThemeProvider>
      </body>
    </html>
  )
}