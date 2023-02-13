'use client'

import { useRef, useEffect } from 'react';

// styles
import styles from '@/styles/index';

// /section
import Hero from '@/sections/Hero';

const Page = () => (
  <div className={` ${styles.flexStart} flex-col w-full min-h-[90vh] gap-28 overflow-hidden`}>
    <Hero />
  </div>
);

export default Page;
