'use client'

import { useState } from "react";
import Image from 'next/image';
import { useTheme } from "next-themes";

// styles
import styles from '../styles/index';

const LightModeBtn = () => {

    const { systemTheme, theme, setTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState('');
    const [mounted, setMounted] = useState(false);

    const renderThemeChange = () => {
        const currentThemeVar = theme === 'system' ? systemTheme : theme;

        setCurrentTheme(currentThemeVar);
    }

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            return;
        }
        setTheme('light');
    }

  return (



    <button onClick={() => toggleTheme()} className='grid content-center transition-all duration-300 hover:bg-primary-grey dark:hover:bg-secondary-white-97 rounded-full p-3' aria-label="toggle_light_mode">
        { 
        (theme !== 'dark') ? 
            <Image className="w-[24px] h-[24px] object-contain relative" src="/sunIcon.svg" alt="lightMode" width={24} height={24}/> 
            : <Image className="w-[24px] h-[24px] object-contain relative" src="/moonIcon.svg" alt="darkMode" width={24} height={24}/>
        }
    </button>
  );
};

export default LightModeBtn;