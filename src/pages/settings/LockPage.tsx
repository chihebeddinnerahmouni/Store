import InputPassword from "../../components/ui/inputs/InputPassword";
import { useState } from "react";
import ShiningButton from "../../components/ui/buttons/ShiningButton";


interface LockPageProps {
  isLocked: boolean;
  setIsLocked: (isLocked: boolean) => void;
  }

const LockPage = ({ setIsLocked }: LockPageProps) => {
  
  const password = import.meta.env.VITE_PASSWORD as string;
  const [passwordValue, setPasswordValue] = useState<string>("");

  const checkPassword = () => {
    if (passwordValue === password) {
      setIsLocked(false);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-5 px-4 md:px-10 lg:px-20 maw-w-[1700px] mx-auto">
      <InputPassword
        label="Mot de passe"
        value={passwordValue}
        setValue={setPasswordValue}
      />
      <ShiningButton
        text="Déverrouiller"
        color="green"
        onClick={checkPassword}
        icon={null}
      />
    </div>
  )
}

export default LockPage
