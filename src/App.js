import {Button} from '@chakra-ui/button';
import {Image} from '@chakra-ui/image';
import {Text} from '@chakra-ui/layout';
import {Box, Flex, Heading, Stack} from '@chakra-ui/layout';
import {useState} from 'react';
import {Container} from '@chakra-ui/react';

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [dice, setDice] = useState(1);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const numbers = [1, 2, 3, 4, 5, 6];


  const gameHandler = () => {
    setStartGame(true);
  };

  const onNumberClicked = (val) => {
    setSelectedNumber(val);
    setError(null);
  };

  const randomNum = () => {
    if (selectedNumber) {
      const genratedNo = Math.ceil(Math.random() * 6);
      setDice(genratedNo);

      if (selectedNumber === genratedNo) {
        setScore((prev) => prev + genratedNo);
      } else {
        setScore((prev) => prev - 2);
      }
    } else {
      setError('Please Select Number');
    }
  };

  return (
    <>
      {startGame ? (
        <>
          <Stack
            justify='center'
            align='center'
            maxW='1300px'
            mx='auto'
            h='100vh'
          >
            <Heading
              as='h1'
              color={error ? '#C53030' : '#2D3748'}
              fontSize='6xl'
              mb='8'
            >
              {selectedNumber ? 'Number selected' : 'Select number'}
            </Heading>
            <Flex pb='10'>
              {numbers.map((value) => (
                <Button
                  display='flex'
                  justify='center'
                  align='center'
                  h='50px'
                  w='50px'
                  bg={selectedNumber === value ? '#2F855A' : '#CBD5E0'}
                  color='white'
                  fontSize='2xl'
                  key={value}
                  mr={4}
                  borderRadius='lg'
                  onClick={() => onNumberClicked(value)}
                >
                  {value}
                </Button>
              ))}
            </Flex>
            <Box as='button' h='150px' width='150px' onClick={randomNum}>
              <Image src={`/dice/dice${dice}.png`}/>
            </Box>
            <Text fontSize='6xl' fontWeight='bold' color='#2D3748'>
              Score:
            </Text>
            <Text
              color={score > 0 ? '#38A169' : '#C53030'}
              fontSize='8xl'
              fontWeight='bold'
            >
              {score}
            </Text>
            <Button onClick={() => setScore(0)} color='#2D3748'>Reset Score</Button>
          </Stack>
        </>
      ) : (
        <Flex justify='center' align='center'>
          <Image width='50%' src='/dices.png'/>
          <Stack>
            <Heading fontSize='7xl' as='h1' color='#2D3748'>
              {' '}
              Dice Game
            </Heading>
            <Button
              alignSelf='flex-end'
              _hover={{bg:'#A0AEC0'}}
              onClick={gameHandler}
              p='30px'
              color='white'
              mt='4'
              bg='#2C7A7B'
              rounded='md'
              shadow='md'
              fontSize={20}
            >
              Start
            </Button>
          </Stack>
        </Flex>
      )}
      <Container maxW='xl' centerContent>
        <Box padding='4' bg='gray.100' maxW='3xl' borderRadius={15} color='#2D3748'>
          Game Rules:
          1) select number
          2) click on dice image to roll it
          3) if your chosen number fell out, you will receive the same number of points, if you didn't guess correctly, your score will decrease by two
        </Box>
      </Container>
    </>
  );
};

export default App;
