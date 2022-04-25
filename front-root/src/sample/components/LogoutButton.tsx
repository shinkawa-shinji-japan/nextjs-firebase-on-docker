import { Button } from '@mui/material';
import { logout } from '@/src/hooks/auth';

const LogoutButton = () => {
  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };
  return <Button onClick={handleLogout}>ログアウト</Button>;
};
export default LogoutButton;
