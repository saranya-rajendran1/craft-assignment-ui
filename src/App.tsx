import './App.css';
import { Box, ChakraProvider } from '@chakra-ui/react'
import { ProfileDetail } from './Pages/ProfileDetail';

function App() {
  return (
   <ChakraProvider>
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'700px'} bgColor={'#F9F9F9'}>
      <ProfileDetail />
      </Box>  
   </ChakraProvider>
  );
}

export default App;
