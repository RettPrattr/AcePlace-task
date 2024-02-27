import React, { FC } from 'react'
import { useState, useEffect, useContext } from 'react';
import Button from '../button/Button'
import '../../styles/global.scss'
import styles from './ui/ModalPopup.module.scss'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFormData } from '../../context/FormDataContext'
import { ModalPopupProps } from '../../models/models'



const ModalPopup: React.FC<ModalPopupProps> = ({ active, changeActivity, pathname }) => {


  const { formData, setFormData } = useFormData();


  const [isCopied, setIsCopied] = useState<boolean>(false)


  const copyToClipboard = async (textToCopy: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);

      } catch (err) {
  
      }
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      console.log('Текст скопирован в буфер обмена с помощью fallback метода.');
    }
  };
  

  const isRegistrationPage = pathname === '/registration'


  const router = useRouter();

  return (
    <div className={'popup ' + (active ? ' active ' : '  ')}>
      {!isRegistrationPage ? <div className='popup-container'>
        <h2>Запрос отправлен</h2>
        <div className="closeBtn" onClick={() => changeActivity(false)}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.26035 0.260349C0.607482 -0.0867832 1.1703 -0.0867831 1.51743 0.26035L8.00003 6.74295L14.4826 0.260407C14.8297 -0.0867256 15.3925 -0.0867256 15.7396 0.260407C16.0868 0.60754 16.0868 1.17035 15.7396 1.51749L9.25711 8.00003L15.7396 14.4825C16.0867 14.8296 16.0867 15.3925 15.7396 15.7396C15.3925 16.0867 14.8296 16.0867 14.4825 15.7396L8.00003 9.25711L1.51749 15.7396C1.17036 16.0868 0.607543 16.0868 0.26041 15.7396C-0.0867228 15.3925 -0.0867228 14.8297 0.26041 14.4826L6.74295 8.00003L0.260349 1.51743C-0.0867832 1.1703 -0.0867831 0.607482 0.26035 0.260349Z" fill="#373739" />
        </svg></div>
        <div className="copylink-container">
          <p>Скопируйте ссылку на страницу ожидания ответа</p>
          <div className="copy-row">
            <div onClick={() => {copyToClipboard('/registration'); setIsCopied(true)}} className="link"><a>http://localhost:3000/registration</a></div>
            {isCopied === false ? <div onClick={() => {copyToClipboard('http://localhost:3000/registration'); setIsCopied(true)}} className="copyBtn"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#5E5BB3" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9543 13.5417H22.5457C23.6854 13.5417 24.604 13.5416 25.3265 13.6388C26.0766 13.7396 26.7081 13.9554 27.2097 14.457C27.7113 14.9586 27.9271 15.5901 28.0279 16.3402C28.125 17.0627 28.125 17.9813 28.125 19.1209V23.3791C28.125 24.5187 28.125 25.4373 28.0279 26.1598C27.9271 26.9099 27.7113 27.5415 27.2097 28.043C26.7081 28.5446 26.0766 28.7604 25.3265 28.8612C24.604 28.9584 23.6854 28.9584 22.5457 28.9583H19.9543C18.8146 28.9584 17.896 28.9584 17.1735 28.8612C16.4235 28.7604 15.7919 28.5446 15.2903 28.043C14.7887 27.5415 14.573 26.9099 14.4721 26.1598C14.375 25.4373 14.375 24.5187 14.375 23.3791V19.1209C14.375 17.9813 14.375 17.0627 14.4721 16.3402C14.573 15.5901 14.7887 14.9586 15.2903 14.457C15.7919 13.9554 16.4235 13.7396 17.1735 13.6388C17.896 13.5416 18.8146 13.5417 19.9543 13.5417ZM17.3401 14.8776C16.7286 14.9598 16.4048 15.1102 16.1742 15.3408C15.9435 15.5715 15.7932 15.8953 15.711 16.5068C15.6263 17.1362 15.625 17.9705 15.625 19.1667V23.3333C15.625 24.5295 15.6263 25.3638 15.711 25.9932C15.7932 26.6047 15.9435 26.9285 16.1742 27.1592C16.4048 27.3898 16.7286 27.5402 17.3401 27.6224C17.9696 27.707 18.8038 27.7083 20 27.7083H22.5C23.6962 27.7083 24.5304 27.707 25.1599 27.6224C25.7714 27.5402 26.0952 27.3898 26.3258 27.1592C26.5565 26.9285 26.7068 26.6047 26.789 25.9932C26.8737 25.3638 26.875 24.5295 26.875 23.3333V19.1667C26.875 17.9705 26.8737 17.1362 26.789 16.5068C26.7068 15.8953 26.5565 15.5715 26.3258 15.3408C26.0952 15.1102 25.7714 14.9598 25.1599 14.8776C24.5304 14.793 23.6962 14.7917 22.5 14.7917H20C18.8038 14.7917 17.9696 14.793 17.3401 14.8776Z" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1197 11.0417L22.5 11.0417C24.2259 11.0417 25.625 12.4408 25.625 14.1667H24.375C24.375 13.1311 23.5355 12.2917 22.5 12.2917H19.1667C17.5777 12.2917 16.4488 12.293 15.5924 12.4081C14.754 12.5209 14.2709 12.7322 13.9183 13.0849C13.5656 13.4376 13.3542 13.9206 13.2415 14.759C13.1263 15.6154 13.125 16.7443 13.125 18.3333V23.3333C13.125 24.3689 13.9645 25.2083 15 25.2083V26.4583C13.2741 26.4583 11.875 25.0592 11.875 23.3333L11.875 18.2863C11.875 16.7549 11.875 15.5418 12.0026 14.5925C12.134 13.6155 12.4107 12.8247 13.0344 12.201C13.658 11.5774 14.4488 11.3006 15.4258 11.1693C16.3752 11.0416 17.5882 11.0417 19.1197 11.0417Z" fill="white" />
            </svg>
            </div> : <div className='successBtn'>
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#06d466"/>
              <path d="M12 20 l5 5 l10 -10" stroke="white" stroke-width="4" fill="none"/>
            </svg>
            </div>}
          </div>
        </div>
        <p>Или</p>
        <Button
          text={'На страницу ожидания ответа'}
          path={'/loading'}
          type={2}
        />
      </div> : 
      <div className="popup-container">
          <div className="successMessage">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M89.4081 45C89.4081 69.5258 69.526 89.4079 45.0002 89.4079C20.4744 89.4079 0.592285 69.5258 0.592285 45C0.592285 20.4742 20.4744 0.592102 45.0002 0.592102C69.526 0.592102 89.4081 20.4742 89.4081 45ZM62.898 31.5429C64.1987 32.8436 64.1987 34.9524 62.898 36.2531L40.6941 58.4571C39.3934 59.7577 37.2846 59.7577 35.9839 58.4571L27.1023 49.5755C25.8017 48.2748 25.8017 46.166 27.1023 44.8653C28.403 43.5646 30.5118 43.5646 31.8125 44.8653L38.339 51.3918L48.2634 41.4674L58.1879 31.5429C59.4885 30.2423 61.5974 30.2423 62.898 31.5429Z" fill="#65DC7F"/>
            </svg>
            <h2>Вы успешно зарегистрировались!</h2>
            <Button
              text={'Перейдите на главную страницу'}
              path={'/'}
              type={2}
              onClick={() => {
                setFormData(null);
                sessionStorage.removeItem('formData'); 
              }}
            />
          </div>
      </div>
      
      
      }
    </div>
  )
}

export default ModalPopup
