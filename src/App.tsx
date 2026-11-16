import { LoaderProvider } from './app/LoaderContext';
import { Loader } from './components/layout/Loader';
import { AppRouter } from './app/router';

export default function App() {
  return (
    <LoaderProvider>
      <Loader />
      <AppRouter />
    </LoaderProvider>
  );
}
