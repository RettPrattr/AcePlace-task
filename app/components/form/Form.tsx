import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import MaskedInput from "react-text-mask";
import * as Yup from "yup";
import styles from './Form.module.scss'
import Button from '../button/Button'
import ModalPopup from '../modal/ModalPopup'
import '../../styles/global.scss'
import { useRouter } from 'next/router';
import { useFormData, initialFormData } from '../../context/FormDataContext'
import { FormValues, HandleSchemaValueParams } from '../../models/models'

const phoneNumberMask = [
    /[\+]/,
    /[1-9]/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/
];


const getValidationSchema = (hidePasswordFields: boolean) => {
    if (hidePasswordFields) {
        return Yup.object({
            firstName: Yup.string()
                .min(2, 'Минимальное количество символов: 2')
                .required('Обязательное поле'),
            lastName: Yup.string()
                .min(2, 'Минимальное количество символов: 2')
                .required('Обязательное поле'),
            email: Yup.string().email('Введите корректный адрес')
                .min(6, 'Минимальное количество символов: 6')
                .required('Обязательное поле'),
            mobilephone: Yup.string()
                .min(16, 'Введите номер полностью')
                .required('Обязательное поле'),
        })
    } else {
        return Yup.object({
            firstName: Yup.string()
                .min(2, 'Минимальное количество символов: 2')
                .required('Обязательное поле'),
            lastName: Yup.string()
                .min(2, 'Минимальное количество символов: 2')
                .required('Обязательное поле'),
            email: Yup.string().email('Введите корректный адрес')
                .min(6, 'Минимальное количество символов: 6')
                .required('Обязательное поле'),
            mobilephone: Yup.string()
                .min(16, 'Введите номер полностью')
                .required('Обязательное поле'),
            password: Yup.string().required('Обязательное поле'),
            repeatedPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
                .required('Обязательное поле'),
        });
    }
};



const Form: React.FC = () => {

    const { formData, setFormData } = useFormData();

    const router = useRouter();
    const hidePasswordFields = router.pathname === '/';

    const [passwordType, setPasswordType] = useState("password");
    const [showPassword, setShowPassword] = useState(false)

    const [password2Type, setPassword2Type] = useState("password");
    const [showPassword2, setShowPassword2] = useState(false)

    const [isModalActive, setModalActive] = useState<boolean>(false)

    const [isSchemaValid, setIsSchemaValid] = useState<boolean>(false)
    const [submitDelay, setSumbitDelay] = useState<boolean>()

    const [disableInput1, setDisableInput1] = useState<boolean>(true)
    const [focused1, setFocused1] = useState<boolean>(false)
    const onFocus1 = () => setFocused1(true)
    const onBlur1 = () => setFocused1(false)
    const [onBlurOnce1, setOnBlurOnce1] = useState<boolean>(false)

    const [disableInput2, setDisableInput2] = useState<boolean>(true)
    const [focused2, setFocused2] = useState<boolean>(false)
    const onFocus2 = () => { setFocused2(true) }
    const onBlur2 = () => setFocused2(false)
    const [onBlurOnce2, setOnBlurOnce2] = useState<boolean>(false)

    const [disableInput3, setDisableInput3] = useState<boolean>(true)
    const [focused3, setFocused3] = useState<boolean>(false)
    const onFocus3 = () => setFocused3(true)
    const onBlur3 = () => setFocused3(false)
    const [onBlurOnce3, setOnBlurOnce3] = useState<boolean>(false)

    const [disableInput4, setDisableInput4] = useState<boolean>(true)
    const [focused4, setFocused4] = useState<boolean>(false)
    const onFocus4 = () => setFocused4(true)
    const onBlur4 = () => setFocused4(false)
    const [onBlurOnce4, setOnBlurOnce4] = useState<boolean>(false)


    const [disableInput5, setDisableInput5] = useState<boolean>(true)
    const [focused5, setFocused5] = useState<boolean>(false)
    const onFocus5 = () => setFocused5(true)
    const onBlur5 = () => setFocused5(false)
    const [onBlurOnce5, setOnBlurOnce5] = useState<boolean>(false)


    const [disableInput6, setDisableInput6] = useState<boolean>(true)
    const [focused6, setFocused6] = useState<boolean>(false)
    const onFocus6 = () => setFocused6(true)
    const onBlur6 = () => setFocused6(false)
    const [onBlurOnce6, setOnBlurOnce6] = useState<boolean>(false)


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    const togglePassword2 = () => {
        if (password2Type === "password") {
            setPassword2Type("text")
            return;
        }
        setPassword2Type("password")
    }


    const handleModalActivity = (state: boolean) => {
        setModalActive(state)
    }


    useEffect(() => {
        const savedFormData = sessionStorage.getItem('formData');
        if (savedFormData) {
            const parsedData = JSON.parse(savedFormData);
            setFormData(parsedData);
        }
    }, []);


    useEffect(() => {
        if (formData) {
            formik.setValues({
                ...initialFormData, 
                ...formData, 
                password: formData.password || '',
                repeatedPassword: formData.repeatedPassword || '',
            });
        }
    }, [formData]);


    const formik = useFormik<FormValues>({
        initialValues: {
            ...initialFormData, 
            ...formData || {}, 
            password: formData?.password || '',
            repeatedPassword: formData?.repeatedPassword || '',
        },
        validationSchema: getValidationSchema(hidePasswordFields),
        onSubmit: (values) => {

            sessionStorage.setItem('formData', JSON.stringify(values));
            setFormData(values);

            
            if (!hidePasswordFields) {
                
                
            } else {
                

            }
        },
    });



    const handleSchemaValue = ({ firstNameForm, lastNameForm, numberForm, emailForm, passwordForm, repeatedPasswordForm }: HandleSchemaValueParams) => {

        const obj = hidePasswordFields
            ? {
                firstName: firstNameForm,
                lastName: lastNameForm,
                email: emailForm,
                mobilephone: numberForm,
            }
            : {
                firstName: firstNameForm,
                lastName: lastNameForm,
                email: emailForm,
                mobilephone: numberForm,
                password: passwordForm,
                repeatedPassword: repeatedPasswordForm,
            };

        const isValid = getValidationSchema(hidePasswordFields).isValidSync(obj)

        setIsSchemaValid(isValid)

        console.log(isValid, "VALID ")

    }

    useEffect(() => {
        const timerFirst = setTimeout(() => {
            setSumbitDelay(true)
        }, 3000);
        return () => clearTimeout(timerFirst);
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisableInput1(false)
            setDisableInput2(false)
            setDisableInput3(false)
            setDisableInput4(false)
            setDisableInput5(false)
            setDisableInput6(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, [])


    return (
        <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.title}>
                <h1>Регистрация аккаунта</h1>
            </div>
            <div className={styles['input-field']}>
                <input
                    type="text"
                    disabled={disableInput1}
                    autoComplete="off"
                    name="firstName"
                    id="firstName"
                    placeholder=" "
                    className={'' + (formik.errors.firstName && onBlurOnce1 === true ? ' invalid ' : ' ')}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        onFocus1()
                        setDisableInput2(true)
                        setDisableInput3(true)
                        setDisableInput4(true)
                        setDisableInput5(true)
                        setDisableInput6(true)
                    }}
                    onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                        formik.handleChange(e)
                        const timer = setTimeout(() => {
                            handleSchemaValue({
                                firstNameForm: e.target.value,
                                lastNameForm: formik.values.lastName,
                                numberForm: formik.values.mobilephone,
                                emailForm: formik.values.email,
                                passwordForm: formik.values.password,
                                repeatedPasswordForm: formik.values.repeatedPassword
                            })
                        }, 100);
                        return () => clearTimeout(timer);
                    }
                    }
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        onBlur1()
                        setDisableInput2(false)
                        setDisableInput3(false)
                        setDisableInput4(false)
                        setDisableInput5(false)
                        setDisableInput6(false)
                        setOnBlurOnce1(true)
                    }}
                    value={formik.values.firstName}
                />
                <label
                    className={(focused1 === false && formik.values.firstName === '' ? 'label' : 'label animate') + (formik.errors.firstName && onBlurOnce1 === true ? ' invalid ' : ' ')}
                    htmlFor="firstName">
                    Имя
                </label>
            </div>
            <div className={styles['input-field']}>
                <input
                    type="text"
                    disabled={disableInput2}
                    autoComplete="off"
                    name="lastName"
                    id="lastName"
                    placeholder=" "
                    className={'' + (formik.errors.lastName && onBlurOnce2 === true ? ' invalid ' : ' ')}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        onFocus2()
                        setDisableInput1(true)
                        setDisableInput3(true)
                        setDisableInput4(true)
                        setDisableInput5(true)
                        setDisableInput6(true)
                    }}
                    onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                        formik.handleChange(e)
                        const timer = setTimeout(() => {
                            handleSchemaValue({
                                firstNameForm: formik.values.firstName,
                                lastNameForm: e.target.value,
                                numberForm: formik.values.mobilephone,
                                emailForm: formik.values.email,
                                passwordForm: formik.values.password,
                                repeatedPasswordForm: formik.values.repeatedPassword
                            })
                        }, 100);
                        return () => clearTimeout(timer);
                    }
                    }
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        onBlur2()
                        setDisableInput1(false)
                        setDisableInput3(false)
                        setDisableInput4(false)
                        setDisableInput5(false)
                        setDisableInput6(false)
                        setOnBlurOnce2(true)
                    }}
                    value={formik.values.lastName}
                />
                <label
                    className={(focused2 === false && formik.values.lastName === '' ? 'label' : 'label animate') + (formik.errors.lastName && onBlurOnce2 === true ? ' invalid ' : ' ')}
                    htmlFor="lastName">
                    Фамилия
                </label>
            </div>
            <div className={styles['input-field']}>
                <input
                    type="text"
                    disabled={disableInput3}
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder=" "
                    className={'' + (formik.errors.email && onBlurOnce3 === true ? ' invalid ' : ' ')}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        onFocus3()
                        setDisableInput2(true)
                        setDisableInput1(true)
                        setDisableInput4(true)
                        setDisableInput5(true)
                        setDisableInput6(true)
                    }}
                    onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                        formik.handleChange(e)
                        const timer = setTimeout(() => {
                            handleSchemaValue({
                                firstNameForm: formik.values.firstName,
                                lastNameForm: formik.values.lastName,
                                numberForm: formik.values.mobilephone,
                                emailForm: e.target.value,
                                passwordForm: formik.values.password,
                                repeatedPasswordForm: formik.values.repeatedPassword
                            })
                        }, 100);
                        return () => clearTimeout(timer);
                    }
                    }
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        onBlur3()
                        setDisableInput2(false)
                        setDisableInput1(false)
                        setDisableInput4(false)
                        setDisableInput5(false)
                        setDisableInput6(false)
                        setOnBlurOnce3(true)
                    }}
                    value={formik.values.email}
                />
                <label
                    className={(focused3 === false && formik.values.email === '' ? 'label' : 'label animate') + (formik.errors.email && onBlurOnce3 === true ? ' invalid ' : ' ')}
                    htmlFor="email">
                    Email
                </label>
            </div>
            <div className={styles['input-field']}>
                <MaskedInput
                    guide={false}
                    mask={phoneNumberMask}
                    disabled={disableInput4}
                    autoComplete="off"
                    type="tel"
                    name="mobilephone"
                    id="mobilephone"
                    placeholder=" "
                    className={'' + (formik.errors.mobilephone && onBlurOnce4 === true ? ' invalid ' : ' ')}
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                        onFocus4()
                        setDisableInput2(true)
                        setDisableInput3(true)
                        setDisableInput1(true)
                        setDisableInput5(true)
                        setDisableInput6(true)
                        if (!formik.values.mobilephone?.startsWith('+')) {
                            formik.setFieldValue('mobilephone', '+7 ')
                        }
                    }}
                    onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                        formik.handleChange(e)
                        const timer = setTimeout(() => {
                            handleSchemaValue({
                                firstNameForm: formik.values.firstName,
                                lastNameForm: formik.values.lastName,
                                numberForm: e.target.value,
                                emailForm: formik.values.email,
                                passwordForm: formik.values.password,
                                repeatedPasswordForm: formik.values.repeatedPassword
                            })
                        }, 100);
                        return () => clearTimeout(timer);
                    }
                    }
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        onBlur4()
                        setDisableInput2(false)
                        setDisableInput3(false)
                        setDisableInput1(false)
                        setDisableInput5(false)
                        setDisableInput6(false)
                        setOnBlurOnce4(true)
                    }}
                    value={formik.values.mobilephone.replace(/_/g, " ")}
                />
                <label
                    className={(focused4 === false && formik.values.mobilephone === '' ? 'label' : 'label animate') + (formik.errors.mobilephone && onBlurOnce4 === true ? ' invalid ' : ' ')}
                    htmlFor="mobilephone">
                    Номер телефона
                </label>
            </div>
            {!hidePasswordFields && (
                <div className={styles['input-field']}>
                    <input
                        type={passwordType}
                        disabled={disableInput5}
                        autoComplete="off"
                        name="password"
                        id="password"
                        placeholder=" "
                        className={'' + (formik.errors.password && onBlurOnce5 === true ? ' invalid ' : ' ')}
                        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                            onFocus5()
                            setDisableInput2(true)
                            setDisableInput1(true)
                            setDisableInput3(true)
                            setDisableInput4(true)
                            setDisableInput6(true)
                        }}
                        onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                            formik.handleChange(e)
                            const timer = setTimeout(() => {
                                handleSchemaValue({
                                    firstNameForm: formik.values.firstName,
                                    lastNameForm: formik.values.lastName,
                                    numberForm: formik.values.mobilephone,
                                    emailForm: formik.values.email,
                                    passwordForm: e.target.value,
                                    repeatedPasswordForm: formik.values.repeatedPassword
                                })
                            }, 100);
                            return () => clearTimeout(timer);
                        }
                        }
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            onBlur5()
                            setDisableInput2(false)
                            setDisableInput1(false)
                            setDisableInput4(false)
                            setDisableInput3(false)
                            setDisableInput6(false)
                            setOnBlurOnce5(true)
                        }}
                        value={formik.values.password}
                    />
                    <label
                        className={(focused5 === false && formik.values.password === '' ? 'label' : 'label animate') + (formik.errors.password && onBlurOnce5 === true ? ' invalid ' : ' ')}
                        htmlFor="password">
                        Пароль
                    </label>
                    <div className={styles['eye-off']} onClick={() => { togglePassword() }}>
                        {passwordType === "text" ?
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5" clip-path="url(#clip0_142_365)">
                                    <path d="M12 14C12.8284 14 13.5 13.3284 13.5 12.5C13.5 11.6716 12.8284 11 12 11C11.1716 11 10.5 11.6716 10.5 12.5C10.5 13.3284 11.1716 14 12 14Z" fill="#3B4449" />
                                    <path d="M15.2901 18.6201L14.0001 17.2801L13.9301 17.2101L12.6601 15.9401C12.4585 15.9754 12.2546 15.9955 12.0501 16.0001C11.5863 16.0067 11.1257 15.9211 10.6953 15.7482C10.2649 15.5753 9.87313 15.3185 9.54281 14.9928C9.21249 14.6672 8.9502 14.2791 8.77119 13.8512C8.59218 13.4232 8.50002 12.964 8.50007 12.5001C8.50471 12.2956 8.52476 12.0917 8.56007 11.8901L6.56007 9.89012L5.00007 8.37012C3.87139 9.43359 2.90448 10.6566 2.13007 12.0001C2.0423 12.1521 1.99609 12.3246 1.99609 12.5001C1.99609 12.6757 2.0423 12.8481 2.13007 13.0001C2.76007 14.0901 6.13007 19.5001 12.0201 19.5001H12.2701C13.3776 19.4673 14.4708 19.2405 15.5001 18.8301L15.2901 18.6201Z" fill="#3B4449" />
                                    <path d="M8.59 6.26012L11.39 9.06012C11.5915 9.02481 11.7954 9.00475 12 9.00012C12.9283 9.00012 13.8185 9.36887 14.4749 10.0252C15.1313 10.6816 15.5 11.5719 15.5 12.5001C15.4954 12.7047 15.4753 12.9086 15.44 13.1101L18.12 15.7901L18.96 16.6301C20.1028 15.5694 21.0834 14.3463 21.87 13.0001C21.9578 12.8481 22.004 12.6757 22.004 12.5001C22.004 12.3246 21.9578 12.1521 21.87 12.0001C21.23 10.8901 17.71 5.32012 11.73 5.50012C10.6225 5.53297 9.52924 5.75974 8.5 6.17012L8.59 6.26012Z" fill="#3B4449" />
                                    <path d="M20.7102 19.7899L19.4102 18.4999L17.4102 16.4999L7.89019 6.96994L6.42019 5.49994L4.71019 3.78994C4.61695 3.6967 4.50626 3.62274 4.38443 3.57228C4.26261 3.52182 4.13204 3.49585 4.00019 3.49585C3.86833 3.49585 3.73776 3.52182 3.61594 3.57228C3.49411 3.62274 3.38342 3.6967 3.29019 3.78994C3.10188 3.97825 2.99609 4.23364 2.99609 4.49994C2.99609 4.76624 3.10188 5.02164 3.29019 5.20994L5.53019 7.49994L7.28019 9.19994L14.5902 16.4999L14.6602 16.5699L16.0002 17.9099L16.5902 18.4999L19.2902 21.2099C19.3831 21.3037 19.4937 21.3781 19.6156 21.4288C19.7375 21.4796 19.8682 21.5057 20.0002 21.5057C20.1322 21.5057 20.2629 21.4796 20.3848 21.4288C20.5066 21.3781 20.6172 21.3037 20.7102 21.2099C20.8039 21.117 20.8783 21.0064 20.9291 20.8845C20.9798 20.7627 21.006 20.632 21.006 20.4999C21.006 20.3679 20.9798 20.2372 20.9291 20.1154C20.8783 19.9935 20.8039 19.8829 20.7102 19.7899Z" fill="#3B4449" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_142_365">
                                        <rect width="24" height="24" fill="#3B4449" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg> :
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5" clip-path="url(#clip0_215_362)">
                                    <path d="M12 14C12.8284 14 13.5 13.3284 13.5 12.5C13.5 11.6716 12.8284 11 12 11C11.1716 11 10.5 11.6716 10.5 12.5C10.5 13.3284 11.1716 14 12 14Z" fill="#3B4449" />
                                    <path d="M21.8701 12.0001C21.2301 10.8901 17.7101 5.32012 11.7301 5.50012C6.20007 5.64012 3.00007 10.5001 2.13007 12.0001C2.0423 12.1521 1.99609 12.3246 1.99609 12.5001C1.99609 12.6757 2.0423 12.8481 2.13007 13.0001C2.76007 14.0901 6.13007 19.5001 12.0201 19.5001H12.2701C17.8001 19.3601 21.0101 14.5001 21.8701 13.0001C21.9578 12.8481 22.004 12.6757 22.004 12.5001C22.004 12.3246 21.9578 12.1521 21.8701 12.0001V12.0001ZM12.0001 16.0001C11.3078 16.0001 10.6311 15.7948 10.0556 15.4103C9.48 15.0257 9.0314 14.479 8.76649 13.8395C8.50158 13.2 8.43227 12.4962 8.56732 11.8173C8.70237 11.1384 9.03571 10.5147 9.52519 10.0252C10.0147 9.53576 10.6383 9.20242 11.3173 9.06737C11.9962 8.93232 12.6999 9.00163 13.3395 9.26654C13.979 9.53144 14.5256 9.98005 14.9102 10.5556C15.2948 11.1312 15.5001 11.8079 15.5001 12.5001C15.5001 13.4284 15.1313 14.3186 14.4749 14.975C13.8186 15.6314 12.9283 16.0001 12.0001 16.0001V16.0001Z" fill="#3B4449" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_215_362">
                                        <rect width="24" height="24" fill="#3B4449" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        }


                    </div>
                </div>
            )}
            {!hidePasswordFields && (
                <div className={styles['input-field']}>
                    <input
                        type={password2Type}
                        disabled={disableInput6}
                        autoComplete="off"
                        name="repeatedPassword"
                        id="repeatedPassword"
                        placeholder=" "
                        className={'' + (formik.errors.repeatedPassword && onBlurOnce6 === true ? ' invalid ' : ' ')}
                        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                            onFocus6()
                            setDisableInput2(true)
                            setDisableInput1(true)
                            setDisableInput3(true)
                            setDisableInput4(true)
                            setDisableInput5(true)
                        }}
                        onChange={(e: React.FocusEvent<HTMLInputElement>) => {
                            formik.handleChange(e)
                            const timer = setTimeout(() => {
                                handleSchemaValue({
                                    firstNameForm: formik.values.firstName,
                                    lastNameForm: formik.values.lastName,
                                    numberForm: formik.values.mobilephone,
                                    emailForm: formik.values.email,
                                    passwordForm: formik.values.password,
                                    repeatedPasswordForm: e.target.value
                                })
                            }, 100);
                            return () => clearTimeout(timer);
                        }
                        }
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            onBlur6()
                            setDisableInput2(false)
                            setDisableInput1(false)
                            setDisableInput4(false)
                            setDisableInput3(false)
                            setDisableInput5(false)
                            setOnBlurOnce6(true)
                        }}
                        value={formik.values.repeatedPassword}
                    />
                    <label
                        className={(focused6 === false && formik.values.repeatedPassword === '' ? 'label' : 'label animate') + (formik.errors.repeatedPassword && onBlurOnce6 === true ? ' invalid ' : ' ')}
                        htmlFor="repeatedPassword">
                        Повторите пароль
                    </label>
                    <div className={styles['eye-off']} onClick={() => { togglePassword2() }}>
                        {password2Type === "text" ?
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5" clip-path="url(#clip0_142_365)">
                                    <path d="M12 14C12.8284 14 13.5 13.3284 13.5 12.5C13.5 11.6716 12.8284 11 12 11C11.1716 11 10.5 11.6716 10.5 12.5C10.5 13.3284 11.1716 14 12 14Z" fill="#3B4449" />
                                    <path d="M15.2901 18.6201L14.0001 17.2801L13.9301 17.2101L12.6601 15.9401C12.4585 15.9754 12.2546 15.9955 12.0501 16.0001C11.5863 16.0067 11.1257 15.9211 10.6953 15.7482C10.2649 15.5753 9.87313 15.3185 9.54281 14.9928C9.21249 14.6672 8.9502 14.2791 8.77119 13.8512C8.59218 13.4232 8.50002 12.964 8.50007 12.5001C8.50471 12.2956 8.52476 12.0917 8.56007 11.8901L6.56007 9.89012L5.00007 8.37012C3.87139 9.43359 2.90448 10.6566 2.13007 12.0001C2.0423 12.1521 1.99609 12.3246 1.99609 12.5001C1.99609 12.6757 2.0423 12.8481 2.13007 13.0001C2.76007 14.0901 6.13007 19.5001 12.0201 19.5001H12.2701C13.3776 19.4673 14.4708 19.2405 15.5001 18.8301L15.2901 18.6201Z" fill="#3B4449" />
                                    <path d="M8.59 6.26012L11.39 9.06012C11.5915 9.02481 11.7954 9.00475 12 9.00012C12.9283 9.00012 13.8185 9.36887 14.4749 10.0252C15.1313 10.6816 15.5 11.5719 15.5 12.5001C15.4954 12.7047 15.4753 12.9086 15.44 13.1101L18.12 15.7901L18.96 16.6301C20.1028 15.5694 21.0834 14.3463 21.87 13.0001C21.9578 12.8481 22.004 12.6757 22.004 12.5001C22.004 12.3246 21.9578 12.1521 21.87 12.0001C21.23 10.8901 17.71 5.32012 11.73 5.50012C10.6225 5.53297 9.52924 5.75974 8.5 6.17012L8.59 6.26012Z" fill="#3B4449" />
                                    <path d="M20.7102 19.7899L19.4102 18.4999L17.4102 16.4999L7.89019 6.96994L6.42019 5.49994L4.71019 3.78994C4.61695 3.6967 4.50626 3.62274 4.38443 3.57228C4.26261 3.52182 4.13204 3.49585 4.00019 3.49585C3.86833 3.49585 3.73776 3.52182 3.61594 3.57228C3.49411 3.62274 3.38342 3.6967 3.29019 3.78994C3.10188 3.97825 2.99609 4.23364 2.99609 4.49994C2.99609 4.76624 3.10188 5.02164 3.29019 5.20994L5.53019 7.49994L7.28019 9.19994L14.5902 16.4999L14.6602 16.5699L16.0002 17.9099L16.5902 18.4999L19.2902 21.2099C19.3831 21.3037 19.4937 21.3781 19.6156 21.4288C19.7375 21.4796 19.8682 21.5057 20.0002 21.5057C20.1322 21.5057 20.2629 21.4796 20.3848 21.4288C20.5066 21.3781 20.6172 21.3037 20.7102 21.2099C20.8039 21.117 20.8783 21.0064 20.9291 20.8845C20.9798 20.7627 21.006 20.632 21.006 20.4999C21.006 20.3679 20.9798 20.2372 20.9291 20.1154C20.8783 19.9935 20.8039 19.8829 20.7102 19.7899Z" fill="#3B4449" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_142_365">
                                        <rect width="24" height="24" fill="#3B4449" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg> :
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.5" clip-path="url(#clip0_215_362)">
                                    <path d="M12 14C12.8284 14 13.5 13.3284 13.5 12.5C13.5 11.6716 12.8284 11 12 11C11.1716 11 10.5 11.6716 10.5 12.5C10.5 13.3284 11.1716 14 12 14Z" fill="#3B4449" />
                                    <path d="M21.8701 12.0001C21.2301 10.8901 17.7101 5.32012 11.7301 5.50012C6.20007 5.64012 3.00007 10.5001 2.13007 12.0001C2.0423 12.1521 1.99609 12.3246 1.99609 12.5001C1.99609 12.6757 2.0423 12.8481 2.13007 13.0001C2.76007 14.0901 6.13007 19.5001 12.0201 19.5001H12.2701C17.8001 19.3601 21.0101 14.5001 21.8701 13.0001C21.9578 12.8481 22.004 12.6757 22.004 12.5001C22.004 12.3246 21.9578 12.1521 21.8701 12.0001V12.0001ZM12.0001 16.0001C11.3078 16.0001 10.6311 15.7948 10.0556 15.4103C9.48 15.0257 9.0314 14.479 8.76649 13.8395C8.50158 13.2 8.43227 12.4962 8.56732 11.8173C8.70237 11.1384 9.03571 10.5147 9.52519 10.0252C10.0147 9.53576 10.6383 9.20242 11.3173 9.06737C11.9962 8.93232 12.6999 9.00163 13.3395 9.26654C13.979 9.53144 14.5256 9.98005 14.9102 10.5556C15.2948 11.1312 15.5001 11.8079 15.5001 12.5001C15.5001 13.4284 15.1313 14.3186 14.4749 14.975C13.8186 15.6314 12.9283 16.0001 12.0001 16.0001V16.0001Z" fill="#3B4449" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_215_362">
                                        <rect width="24" height="24" fill="#3B4449" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        }


                    </div>

                </div>
            )}


            <div className={styles['submit-button']}>
                <Button

                    onClick={() => {
                        setModalActive(!isModalActive)
                        setFormData(formik.values)
                    }}
                    text={'Зарегистрироваться'}
                    disabled={submitDelay === true && isSchemaValid ? false : true}
                    type={1}
                />
            </div>
            {isModalActive ? <ModalPopup
                changeActivity={handleModalActivity}
                active={isSchemaValid}
                pathname={router.pathname}
            /> : ''}

        </form>
    )
}

export default Form
