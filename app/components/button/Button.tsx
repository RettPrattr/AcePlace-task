import styles from './Button.module.scss';
import Link from 'next/link';
import { ButtonProps } from '../../models/models'



const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false, type, path }) => {

 if (type === 1) { 
  return (
    <div className={styles['submit-button']}>
      <button
        onClick={onClick}
        disabled={disabled}
        type="submit"
      >
        {text}
      </button>
    </div>
  );
 } else {
   return (
     <div className={styles['redirect-button']} onClick={onClick}>
       
       <Link href={path || ''}>{text}</Link>
     </div>
   )
 }
};

export default Button;
