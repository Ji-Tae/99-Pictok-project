import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/layout/Header';
import Main from './pages/Main';
import Footer from './components/layout/Footer';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Main />
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
