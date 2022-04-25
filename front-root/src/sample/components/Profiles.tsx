import React from 'react';
import { useRouter } from 'next/router';
import { UserState } from '@/src/hooks/auth';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { updateDisplayName } from '@/src/utils/firebase/firestore/users';
import { auth } from '@/src/hooks/auth';
import { updateProfile } from 'firebase/auth';

const Profile = (props: UserState) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = React.useState(false);
  const [displayName, setDisplayName] = React.useState(props?.displayName);

  const onChange = (e: any) => {
    setDisplayName(e.target.value);
  };

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onClickUpdate = () => {
    setIsEdit(false);
    if (auth?.currentUser && props?.uid && displayName) {
      updateDisplayName({ uid: props.uid, displayName });
      updateProfile(auth?.currentUser, {
        displayName,
      })
        .then(() => {
          // Profile updated!
          alert('名前を更新しました。');
          router.reload();
        })
        .catch((error) => {
          // An error occurred
          alert('エラーが発生しました。もう一度やり直してください。');
        });
    }
  };

  if (!isEdit) {
    return (
      <div>
        <p>あなたの名前とメールアドレスです。</p>
        <p>名前：{props?.displayName}</p>
        <p>メール：{props?.email}</p>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={onClickEdit}>名前を編集する</Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <TextField
        id='textfield-displayName'
        label='名前'
        variant='standard'
        onChange={onChange}
        sx={{ width: '100%' }}
        value={displayName}
      />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button onClick={onClickUpdate}>更新</Button>
      </div>
    </div>
  );
};
export default Profile;
