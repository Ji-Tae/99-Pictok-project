import Header from './components/layout/Header';
import Main from './pages/Main';
import { useAppLogic } from './components/hooks/useAppLogic';
import Footer from './components/layout/Footer';

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
      <Footer />
    </ >
  );
}

export default App;
