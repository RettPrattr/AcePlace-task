import React, { useState, useEffect } from 'react'
import styles from '../app/styles/Loading/loading.module.scss'
import '../app/styles/global.scss'
import { useRouter } from 'next/router';
import { fetchMockApiData, ApiResponse } from '../app/mockData/mockApi'
import Link from 'next/link';
import Button from '../app/components/button/Button'


const Loading = () => {
    const router = useRouter();
    const id = '2';
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [nextStep, setNextStep] = useState<boolean>();

    useEffect(() => {
        if (typeof id === 'string') {
            fetchMockApiData(id)
                .then((apiResponse) => {
                    setResponse(apiResponse);
                })
                .catch((error: Error) => {
                    setError(error.message);
                });
        }
    }, [id]);


    return (
        <div className={styles.loading}>
            <div className={styles['loading-container']}>
                {response && response.status === 'pending' && (
                    <>
                        <div className={styles['page-loader']}></div>
                        <h4>{response.message}</h4>
                    </>
                )}
                {response && response.status === 'fulfilled' && (
                    <>
                        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M89.4081 45C89.4081 69.5258 69.526 89.4079 45.0002 89.4079C20.4744 89.4079 0.592285 69.5258 0.592285 45C0.592285 20.4742 20.4744 0.592102 45.0002 0.592102C69.526 0.592102 89.4081 20.4742 89.4081 45ZM62.898 31.5429C64.1987 32.8436 64.1987 34.9524 62.898 36.2531L40.6941 58.4571C39.3934 59.7577 37.2846 59.7577 35.9839 58.4571L27.1023 49.5755C25.8017 48.2748 25.8017 46.166 27.1023 44.8653C28.403 43.5646 30.5118 43.5646 31.8125 44.8653L38.339 51.3918L48.2634 41.4674L58.1879 31.5429C59.4885 30.2423 61.5974 30.2423 62.898 31.5429Z" fill="#65DC7F"/>
                        </svg>
                        <h4>{response.message}</h4>
                        <p>Перейдите на страницу продолжения регистрации</p>
                        <Button


                            text={'Перейти'}
                            path={'/registration'}
                            type={2}
                        />
                    </>
                )}
                {response && response.status === 'rejected' && (
                    <>
                        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5248 8.9293C35.5413 3.6431 40.0496 1 45 1C49.9504 1 54.4587 3.6431 63.4752 8.9293L66.5248 10.7172C75.5413 16.0034 80.0496 18.6465 82.5248 23C85 27.3535 85 32.6397 85 43.2121V46.7879C85 57.3603 85 62.6465 82.5248 67C80.0496 71.3535 75.5413 73.9966 66.5248 79.2828L63.4752 81.0707C54.4587 86.3569 49.9504 89 45 89C40.0496 89 35.5413 86.3569 26.5248 81.0707L23.4752 79.2828C14.4587 73.9966 9.95042 71.3535 7.47521 67C5 62.6465 5 57.3603 5 46.7879V43.2121C5 32.6397 5 27.3535 7.47521 23C9.95042 18.6465 14.4587 16.0034 23.4752 10.7172L26.5248 8.9293ZM49.4444 62.6C49.4444 65.0301 47.4546 67 45 67C42.5454 67 40.5556 65.0301 40.5556 62.6C40.5556 60.1699 42.5454 58.2 45 58.2C47.4546 58.2 49.4444 60.1699 49.4444 62.6ZM45 19.7C46.841 19.7 48.3333 21.1775 48.3333 23V49.4C48.3333 51.2225 46.841 52.7 45 52.7C43.1591 52.7 41.6667 51.2225 41.6667 49.4V23C41.6667 21.1775 43.1591 19.7 45 19.7Z" fill="#EE3441"/>
                        </svg>
                        <h4>{response.message}</h4>
                    </>
                )}
            </div>
        </div>
    );
}

export default Loading
