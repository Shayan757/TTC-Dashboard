import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleSuccess = (response) => {
    console.log('Success:', response);
  };

  const handleError = (error) => {
    console.log('Error:', error);
  };

  return (
    // <GoogleOAuthProvider clientId="593252579125-octaij53j9s4hv8iapu554ra992gpv8k.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleError}
      />
    // </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;



// import React from 'react';
// import { GoogleLogin } from 'react-google-login';
// import Image from 'next/image';
// import google from '../../src/app/assets/Google_Icons-09-512.webp'

// const GoogleLoginButton = ({ onSuccess, onFailure }) => {
//   return (
//     <GoogleLogin
//       clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
//       buttonText="Sign up with Google"
//       onSuccess={onSuccess}
//       onFailure={onFailure}
//       cookiePolicy={'single_host_origin'}
//       render={renderProps => (
//         <button
//           onClick={renderProps.onClick}
//           disabled={renderProps.disabled}
//           className="bg-white text-black border border-black py-3 px-4 rounded-md w-full font-bold flex justify-center items-center"
//         >
//           <Image src={google} alt="Google" className="h-5 w-5 mr-2" />
//           Sign up with Google
//         </button>
//       )}
//     />
//   );
// };

// export default GoogleLoginButton;
