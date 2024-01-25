import React from 'react';
import { usePopUpStore } from './store/loginStore';
import LoginModal from './LoginModal';

function LoginLink() {
    const popUp = usePopUpStore((state) => state.setPopUpState)
    const popUpState = usePopUpStore((state) => state.popUpState)
    return (
      <div>
        <button onClick={popUp}>Login</button>
        {popUpState &&
          <LoginModal />}
      </div>
    )
  }

  export default LoginLink;