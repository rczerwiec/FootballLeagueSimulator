"use client";

import { useState } from "react";
import Button from "../../components/ReusableComponents/Button";
import Input from "../../components/ReusableComponents/Input";
import { useCreateUserMutation } from "@/store";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { signIn, getClientAuth } from "@/lib/firebase/client";
import { isAuthSkippedFromEnv, enableSkipAuthClient } from "@/lib/auth/authConfig";

function LogIn({ onSkip }: { onSkip?: () => void }) {
    const [email, setEmail] = useState("");
    const [createUser, results] = useCreateUserMutation();
    const [password, setPassword] = useState("");

    const [emailL, setEmailL] = useState("");
    const [passwordL, setPasswordL] = useState("");

    const registerNewUser = (email, password) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
          createUserWithEmailAndPassword(getClientAuth()!, email, password)
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

    const handleSkip = (e: React.FormEvent) => {
        e.preventDefault();
        enableSkipAuthClient();
        onSkip?.();
    };

    return(
        <div className="p-8 max-w-md mx-auto text-left">
            {!isAuthSkippedFromEnv() && onSkip && (
                <form onSubmit={handleSkip} className="mb-6">
                    <p className="text-slate-200 mb-3 text-sm">
                        Logowanie jest tymczasowo opcjonalne — możesz wejść bez konta.
                    </p>
                    <Button secondary type="submit">Pomiń (tryb lokalny)</Button>
                </form>
            )}
            <form onSubmit={(e) => onRegister(e, email,password)}>
                <Input value={email} onChange={(e)=> setEmail(e.target.value)}></Input>
                <Input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></Input>
                <Button primary>Zarejestruj</Button>
            </form>
            <form onSubmit={(e) => onSignIn(e,emailL, passwordL)}>
                <Input value={emailL} onChange={(e)=> setEmailL(e.target.value)}></Input>
                <Input type="password" value={passwordL} onChange={(e)=> setPasswordL(e.target.value)}></Input>
                <Button primary>Zaloguj</Button>
            </form>

        </div>
    )
}

export default LogIn;