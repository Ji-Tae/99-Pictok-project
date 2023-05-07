import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/layout/Header';
import Main from './pages/Main';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
    </QueryClientProvider>
  );
}

export default App;
