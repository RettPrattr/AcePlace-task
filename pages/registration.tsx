import React from 'react'
import Form from '../app/components/form/Form'
import styles from '../app/styles/Registration/registration.module.scss'
import '../app/styles/global.scss'
import { FormDataProvider } from '@/app/context/FormDataContext'

const Registration = () => {
  return (
    <FormDataProvider>
        <div className={styles.registration}>
            <Form />
        </div>
    </FormDataProvider>
  )
}

export default Registration