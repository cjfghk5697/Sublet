import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../style/popup.css'
function PopUp({ main_text, sub_text, key }) {

  const [show, setShow] = useState(true);
  const [checkState, setCheckState] = useState(false)
  const [deleteState, setDeleteState] = useState(false)

  const handleClose = () => setShow(false);

  const checkHandled = () => {
    setCheckState(!checkState)
  }

  const deleteHandled = () => {
    const deleteReservation = async () => {
      const requestOptions = {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: key
        })
      };

      await (
        await fetch(
          `https://localhost:4000/reservation`
          , requestOptions)
      ).json();
    };
    setDeleteState(true)
  };


  return (
    <>
      {deleteState ? ("") : (<Modal className="bg-white border border-gray-300 shadow-xl rounded-lg container" show={show} disabled>
        <Modal.Body>
          <div className='text-center'>
            <p className="text-lg font-extrabold mt-3">{main_text}</p>
            <div>
              <p className="mt-3  font-medium">
                <input type="checkbox" className="mr-1 w-4 h-4 text-blue-600 border-black-300" checked={checkState} onChange={checkHandled} />
                {sub_text}
              </p>
            </div>
          </div></Modal.Body>
        <Modal.Footer>
          <div className='mt-5'>
            <button onClick={handleClose} className="button_left bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg ml-4 mb-3">
              나가기
            </button>
            {checkState ? (<button onClick={deleteHandled} className="button_right bg-[#F62424] hover:bg-red-700 text-white font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg mb-3 mr-4">
              취소하기
            </button>) : (<button className="button_right mr-auto bg-gray-400 font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg mr-4 mb-3" disabled>
              취소하기
            </button>)}
          </div>
        </Modal.Footer>
      </Modal>)}
    </>
  );
}

export default PopUp;