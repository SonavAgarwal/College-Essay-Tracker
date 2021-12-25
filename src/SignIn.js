import React from "react";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";

function SignIn(props) {
    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button
                onClick={function () {
                    signInWithRedirect(auth, GoogleAuthProvider);
                }}>
                Sign in with Google
            </button>
        </div>
    );
}

export default SignIn;
