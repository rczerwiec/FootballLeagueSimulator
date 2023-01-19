import { useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import { useCreateUserMutation } from "../../store";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signIn ,auth} from "../../firebase/firebase";

function LogIn(){
    const [email, setEmail] = useState("");
    const [createUser, results] = useCreateUserMutation();
    const [password, setPassword] = useState("");

    const [emailL, setEmailL] = useState("");
    const [passwordL, setPasswordL] = useState("");

    const registerNewUser = (email, password) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            createUser({user: user, type: "arcade"})
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
          });
      }


    const onSignIn = (e,emailL, passwordL) => {
        e.preventDefault();
        
        signIn(emailL,passwordL)
    }

    
    const onRegister = (e,email, password) => {
        e.preventDefault();
        
        registerNewUser(email,password)
    }

    return(
        <div>
            <form onSubmit={(e) => onRegister(e, email,password)}>
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