import React, { createContext, useState, useEffect, useContext, ReactNode,  Dispatch, SetStateAction } from 'react';
import { FormDataContextType, FormValues } from '../models/models'



export const initialFormData: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  mobilephone: '',
};


const FormDataContext = createContext<FormDataContextType>({
  formData: initialFormData, 
  setFormData: () => {}, 
});



export const FormDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormValues | null>(initialFormData);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};



export const useFormData = (): FormDataContextType => {
  const context = useContext(FormDataContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormDataProvider');
  }
  return context;
};

