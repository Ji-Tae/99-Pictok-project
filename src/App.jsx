import Header from './components/layout/Header';
import Main from './pages/Main';
import { useAppLogic } from './components/hooks/useAppLogic';

function App() {
  const {
    isLoggedIn,
    handleLoginClick,
    handleSignupClick,
  } = useAppLogic();

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
      />
      <Main />
    </>

  );
}

export default App;
