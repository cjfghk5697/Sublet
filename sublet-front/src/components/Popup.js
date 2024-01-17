import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../style/popup.css'
import * as s from './styles/Popup.styles'

function PopUp({ main_text, sub_text, key_num }) {

  const [show, setShow] = useState(true);
  const [checkState, setCheckState] = useState(false)
  const [deleteState, setDeleteState] = useState(true)

  const handleClose = () => setShow(false);

  const checkHandled = () => {
    setCheckState(!checkState)
  }

  const deleteHandled = async () => {

    const requestOptions = {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        key: key_num
      })
    };

    await (
      await fetch(
        `${prcess.env.REACT_APP_FRONTEND_URL}/reservation`
        , requestOptions)
    ).json();
    setDeleteState(false)

  };

  return (
    <>
      {deleteState && (
        <s.container>
          <Modal show={show} disabled>
            <Modal.Body>
              <div className='text-center'>
                <p className="text-lg font-extrabold mt-3">{main_text}</p>
                <div>
                  <p className="mt-3  font-medium">
                    <s.input_checkbox type="checkbox" checked={checkState} onChange={checkHandled} />
                    {sub_text}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className='mt-5'>
                <s.back_button onClick={handleClose} className="">
                  나가기
                </s.back_button>
                {checkState ? (<s.delete_button_able onClick={deleteHandled} >
                  취소하기
                </s.delete_button_able>) : (<s.delete_button_disabled disabled>
                  취소하기
                </s.delete_button_disabled>)}
              </div>
            </Modal.Footer>
          </Modal>
        </s.container>)}
    </>
  );
}

export default PopUp;