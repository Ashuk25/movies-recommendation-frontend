import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import MovieRecommendation from './components/MovieRecommendation';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <MovieRecommendation />
    </ChakraProvider>
  );
}

export default App;


