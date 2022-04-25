import type { NextPage } from 'next';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useRouter } from 'next/router';

const SampleEmailLogin: NextPage = () => {
  const router = useRouter();

  const loginWithEMailLink = () => {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      if (!email) return;
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log(result);
          window.localStorage.removeItem('emailForSignIn');
          router.push('/sample');
        })
        .catch((error) => {
          console.log(error);
          router.push('/sample');
        });
    }
  };
  loginWithEMailLink();
  return null;
};

export default SampleEmailLogin;
