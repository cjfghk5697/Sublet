import { GoogleLogin } from '@react-oauth/google';

function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
export default function GoogleButton() {

  return (
    <>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse.credential);
          const decodeding = decodeJwtResponse(credentialResponse.credential);
          console.log(decodeding)
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </>

  )
}

