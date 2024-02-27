import React from 'react'
import Form from '../app/components/form/Form'
import styles from '../app/styles/Home/index.module.scss'
import '../app/styles/global.scss'
import { FormDataProvider } from '@/app/context/FormDataContext'

const Index = () => {
  return (
    <FormDataProvider>
        <div className={styles.index}>
            <Form />
        </div>
    </FormDataProvider>
  )
}

export default Index
