import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import LogoutButton from '@/sample/components/LogoutButton';
import { useUser } from '@/src/hooks/auth';
import LoginForm from '@/src/sample/components/LoginForm';
import Profiles from '@/sample/components/Profiles';

const Home: NextPage = () => {
  const user: any = useUser();

  return (
    <>
      {!user ? ( // ログインしていない場合はログインフォームを表示
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <LoginForm />
        </Container>
      ) : (
        // ログインしている場合は操作画面を表示
        <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
          <Container maxWidth='xs'>
            <LogoutButton />
            <p>こんにちは「{user.displayName}」さん</p>
            <Profiles {...user} />
          </Container>
        </Container>
      )}
    </>
  );
};

export default Home;
