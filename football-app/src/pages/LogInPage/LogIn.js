import { useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import { registerNewUser, singIn } from "../../firebase/firebase";

function LogIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailL, setEmailL] = useState("");
    const [passwordL, setPasswordL] = useState("");

    const onSignIn = (e,email, password) => {
        e.preventDefault();
        
        singIn(emailL,passwordL)
    }

    return(
        <div>
            <form onSubmit={() => registerNewUser(email,password)}>
                <Input value={email} onChange={(e)=> setEmail(e.target.value)}></Input>
                <Input value={password} onChange={(e)=> setPassword(e.target.value)}></Input>
                <Button primary>Zarejestruj</Button>
            </form>
            <form onSubmit={(e) => onSignIn(e,emailL, passwordL)}>
                <Input value={emailL} onChange={(e)=> setEmailL(e.target.value)}></Input>
                <Input value={passwordL} onChange={(e)=> setPasswordL(e.target.value)}></Input>
                <Button primary>Zaloguj</Button>
            </form>

        </div>
    )
}

export default LogIn;