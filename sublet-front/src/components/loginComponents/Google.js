import { GoogleLogin } from '@react-oauth/google';
import { FetchLogin, GetOneUser } from '../FetchList';

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
          if (GetOneUser(decodeding.email)) {
            FetchLogin(decodeding.email, 'googleloginmethod')
          } else {
            /*
            구글 정보 가져올 부분
            username=name, email=email, userId=email, verifyemail=true, passworrd: googlelogin
            추가 입력되어야함
            school, student_id, phone, gender, birth 
            */
            console.log('회원가입으로 넘어가기 구현안됨')
          }

        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </>

  )
}

