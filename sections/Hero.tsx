'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image';

// components
import Loader from '@/components/loader';
import SolidSvg from '@/components/SolidSVG';
import ToastMessage from '@/components/Toast';

// styles
import styles from '@/styles/index';

// constants
import {suggestions} from '@/constants';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const languageOptions = [
  { label: 'English (US)', value: 'en-US' },
  { label: 'English (UK)', value: 'en-GB' },
  { label: 'Español (España)', value: 'es-ES' },
  { label: 'Español (México)', value: 'es-MX' },
  { label: 'Français (France)', value: 'fr-FR' },
  { label: 'Italiano', value: 'it-IT' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'Português (Brasil)', value: 'pt-BR' },
  { label: '中文 (普通话)', value: 'zh-CN' },
  { label: '日本語', value: 'ja-JP' },
];

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{show: boolean, msg: string, type: string}>({show:false, msg:'', type:'error' })
  const [inputValue, setInputValue] = useState('Hey luffy, law said he dropped all our meat in the sea. so no launch tonight');
  const [aiRespond, setAiRespond] = useState('');

  // pitch => min="0", max="2", defaultValue="1"
  const [pitch, setPitch] = useState(1);
  // rate => min="0", max="2", defaultValue="1"
  const [rate, setRate] = useState(1);
  const [voice, setVoice] = useState('en-GB');
  const [voices, setVoices] = useState<{ label: string; value: string; index: number }[]>([]);
  // const voice = voices[voiceIndex] || null;
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState('en-US');
  const [blocked, setBlocked] = useState(false);

  const utterance = new SpeechSynthesisUtterance();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window && 'speechSynthesis' in window) {
      setSupported(true);
      // Call getVoices function to populate the voices array
      getVoices();
  
      // Add an event listener to update the voices array when the voices change
      window.speechSynthesis.addEventListener('voiceschanged', getVoices);
    }
  }, []);

  const getVoices = () => {
    const voicesP = window.speechSynthesis.getVoices();
  
    const voices = voicesP.map((voice, index) => {
      return {
        label: `${voice.lang} - ${voice.name}`,
        value: voice.lang,
        index,
      };
    });
  
    setVoices(voices);
  }

  // useSpeechSynthesis
  const onEnd = () => {
    hitAPI(inputValue);
  };
  
  const handleTts = async (event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    tts(inputValue);
  }

  const handleStt = async (event: React.MouseEvent<HTMLButtonElement>  | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setListening(true);
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang; // set the language to English (US)
    
      recognition.onresult = (event:any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log(transcript);
        setInputValue(transcript);
      };

      recognition.start();
    }
  }

  const endStt = async () => {
    setListening(false);
    onEnd();
  }

  const tts = (input: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      
      // Find the voice that matches the selected language
      const selectedVoice = voices.find(v => v.value === voice);

      utterance.addEventListener('end', () => {
        setSpeaking(false);
      })
  
      // Set the voice of the utterance
      if (selectedVoice) {
        utterance.voice = window.speechSynthesis.getVoices()[selectedVoice.index];
      }

      utterance.lang = voice;
      utterance.text = input;
      utterance.volume = 1;
      utterance.pitch = 1;
      utterance.rate = 1;

      console.log('utterance', utterance);
      console.log('voice', voice);
      console.log('input', input);
      
  
      window.speechSynthesis.speak(utterance);
    }
  }

  const hitAPI = (msg:string) => {
    setLoading(true);
    // 
    fetch("/api/getChat", {
        method: "POST",
        body: JSON.stringify({string: msg}),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then((data:any) => {
        setAiRespond(data.object);
        setLoading(false);
        tts(data.object);
    })
    .catch(error => {
        console.log(error);
        setLoading(false);
    });
  }

  const cancel = () => {
    window.speechSynthesis.cancel();
  }
  

  return (
  <section className={`${styles.flexCenter} flex-col gap-2 relative overflow-hidden w-full my-4`} >

    {toast.show && <ToastMessage message={toast.msg} type={'success'} />}
    {loading && <Loader />}

    {!supported && (
      <p className=' text-danger-color text-sm sm:text-base font-bold'>
        Oh no, it looks like your browser doesn&#39;t support Speech
        Synthesis.
      </p>
    )}
    {supported && (

    <div className={` relative ${styles.flexCenter} flex-col gap-10 w-full pb-12  `}>
      <form className={` relative ${styles.flexBetween} gap-2 flex-col w-full `}>
        <label htmlFor="language" aria-label='Language of speech recognition' className={` primary_label_form `}>Language</label>
          <select
            form="speech-recognition"
            id="language"
            value={lang}
            className='search_input'
            onChange={(e) => setLang(e.target.value)}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
      </form>

      <p className=' text-center text-sm sm:text-base'>"{inputValue}"</p>

      <div className={`${styles.flexCenter} w-full `}>
        <button disabled={speaking} title='Click and say something!' onClick={!listening ? handleStt : endStt} className={` ${listening ? 'button-pulse' : '' } ${styles.flexCenter} rounded-full bg-accent-color-71 hover:bg-accent-color-77 hover:scale-110 transition-all duration-300 w-1/3 sm:w-1/4 md:w-32 aspect-square   `}>
          {!loading && <SolidSvg width={'24px'} height={'24px'} className={' scale-110 sm:scale-150 md:scale-110'} color={'#fff'} path={`${listening ? '/ear.svg' : '/mic.svg'}`} />}
          {/* {loading && <Loader />} */}
        </button>
      </div>
      
    </div>

    )}

    <div className={` relative ${styles.flexCenter} flex-col gap-10 w-full pb-12  `}>
      <form className={` relative ${styles.flexBetween} gap-2 flex-col w-full `}>
        <label htmlFor="voice" aria-label='voice of chatGPT' className={` primary_label_form `}>AI Voice</label>
          <select
            id="voice"
            name="voice"
            className='search_input'
            value={voice}
            onChange={(event) => { setVoice(event.target.value);}} >
            {voices.map((option:any, index:number) => (
              <option key={option.label} value={option.value}>
                {`${option.label}`}
              </option>
            ))}
          </select>
      </form>

      <div className={`${styles.flexCenter} w-full `}>
        <div title='Stop the AI from talking!' onClick={cancel} className={` ${speaking ? 'button-pulse' : '' } ${styles.flexCenter} rounded-full bg-accent-color-71 hover:bg-accent-color-77 hover:scale-110 transition-all duration-300 w-1/3 sm:w-1/4 md:w-32 aspect-square   `}>
          {<Image alt='ChatGPT-logo' width={32} height={32} src={`./chatGPT.svg`} />}
        </div>
      </div>

      <p className=' cursor-pointer text-center text-sm sm:text-base' onClick={() => tts(aiRespond)}>"{aiRespond}"</p>
      
    </div>
    

  </section>
  )
};



export default Hero;
