import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Image from "next/image";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { status } = useSession();
  const router = useRouter();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleMagicLink = async () => {
    setError(""); // Reset error
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FASTAPI_BASE_URL}/request-magic-link`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    if (res.ok) {
      setIsMagicLinkSent(true);
    } else {
      setError("Error sending magic link. Please try again.");
    }
    setIsLoading(false);
  };

  // Redirect to the home page after successful login
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Sign In
        </h1>

        {/* Google Sign-In Button */}
        <div className="flex justify-center">
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 mb-4 max-w-xs" // max-w-xs limits the button width
          >
            <img src="/google.svg" alt="Google logo" className="h-5 mr-2" />
            Sign in with Google
          </button>
        </div>

        <div className="my-4 text-gray-500 text-center mb-4">or</div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border px-4 py-2 rounded-lg w-full mb-4 focus:outline-none ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
        />

        {/* Validation Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {/* Magic Link Button */}
        <button
          onClick={handleMagicLink}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200 flex items-center justify-center"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Sending..." : "Send Magic Link"}
        </button>

        {/* Linear Progress Loader */}
        {isLoading && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <LinearProgress />
          </Box>
        )}

        {/* Success Message */}
        {isMagicLinkSent && (
          <Stack sx={{ width: "100%" }} spacing={2} className="mt-4">
            <Alert severity="success">
              Check your email for the magic link!
            </Alert>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default SignIn;
