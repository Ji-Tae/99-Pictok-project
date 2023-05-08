import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/layout/Header';
import Main from './pages/Main';
import { useAppLogic } from './components/hooks/useAppLogic';

const queryClient = new QueryClient();

function App() {
  const {
    isLoggedIn,
    handleLoginClick,
    handleSignupClick,
  } = useAppLogic();

  return (
    <QueryClientProvider client={queryClient}>
      <Header
        isLoggedIn={isLoggedIn}
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
      />
      <Main />
    </QueryClientProvider>
  );
}

export default App;