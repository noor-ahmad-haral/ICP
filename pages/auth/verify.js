import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { signIn } from 'next-auth/react';

const Verify = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_BASE_URL}/verify?token=${token}`);
        if (res.ok) {
          const { email, name, image } = await res.json();

          // Sign in with NextAuth
          await signIn('credentials', { email, token, name, image, redirect: true, callbackUrl: '/' });
        } else {
          const { detail } = await res.json();
          setErrorMessage(detail || 'Error verifying magic link. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Network error. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      {loading ? (
        <h1 className="text-2xl text-white">Verifying your magic link...</h1>
      ) : (
        <div className="max-w-md w-full">
          {errorMessage ? (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Stack>
          ) : (
            <Alert severity="success">Your email has been successfully verified!</Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default Verify;
