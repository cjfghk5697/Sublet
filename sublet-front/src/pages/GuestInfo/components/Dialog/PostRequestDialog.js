import { FetchGetRequestByRequestId } from '@shared/components/FetchList/FetchList';
import { DialogForm } from '@shared/components/Popup/Popup';
import { DialogContent } from '@mui/material';
import { useState } from 'react';
import { PostRequest } from '../Info/GetPostRequest';

export const PostRequestDialog = ({ requestDialogShow, onChange, key }) => {
  const [requestInfo, setRequestInfo] = useState([]);

  FetchGetRequestByRequestId(key, setRequestInfo);

  return (
    <DialogForm
      openState={requestDialogShow}
      handleClose={onChange}
      name="requestDialogShow"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left">
          test
        </label>
      )}>
      <DialogContent sx={{ width: 512 }} className="text-left">
        {requestInfo !== false && <PostRequest requestList={requestInfo} />}
      </DialogContent>
    </DialogForm>
  );
};
