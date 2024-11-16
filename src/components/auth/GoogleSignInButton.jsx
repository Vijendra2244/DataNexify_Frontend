import React from "react";
import { FcGoogle } from "react-icons/fc";
import styles from "../../css/GoogleSignInButton.module.css";

function GoogleSignInButton() {
  const handleGoogleSignIn = () => {
    const googleAuthUrl =
      "https://datanexify-assignment.onrender.com/auth/google";
    window.location.href = googleAuthUrl;
  };
  return (
    <div className={styles.main}>
      <div className={styles.parentForGoogleSignIn}>
        <p className={styles.tagLine}>
          Welcome to DataNexify. Create an event with ease!
        </p>
        <div className={styles.IconsStylesForGoogle}>
          <FcGoogle size={24} />
        </div>
        <button
          onClick={handleGoogleSignIn}
          className={styles.btnForGoogleSingIn}
        >
          <FcGoogle size={24} />
          <p className={styles.textForGoogleSignIn}>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
}

export default GoogleSignInButton;
