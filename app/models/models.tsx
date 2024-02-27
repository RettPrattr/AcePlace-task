import { Dispatch, SetStateAction } from 'react'

export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    mobilephone: string;
    password?: string;
    repeatedPassword?: string;
}

export interface HandleSchemaValueParams {
    firstNameForm: string;
    lastNameForm: string;
    emailForm: string;
    numberForm: string;
    passwordForm?: string;
    repeatedPasswordForm?: string;
};


export interface FormDataContextType {
    formData: FormValues | null; 
    setFormData: Dispatch<SetStateAction<FormValues | null>>;
  }


export interface ModalPopupProps {
    active: boolean;
    changeActivity: (state: boolean) => void;
    pathname?: string;
  }


export interface ButtonProps {
    text: string;
    onClick?: () => void; 
    disabled?: boolean;
    type: number;
    path?: string;
  };