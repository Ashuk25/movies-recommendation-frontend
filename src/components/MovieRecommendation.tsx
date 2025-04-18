import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Box, Button, Image, Text, Flex, Spinner } from "@chakra-ui/react";
import { fetchMovies, fetchRecommendations } from "../api/api";

interface MovieOption {
  value: string;
  label: string;
}

const MovieRecommendation: React.FC = () => {
  const [movies, setMovies] = useState<MovieOption[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieOption | null>();
  const [recommendations, setRecommendations] = useState<{
    movies_name: string[];
    movies_poster: string[];
    movies_description: string[];
    movies_rating: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies().then((data: string[]) => {
      setMovies(data.map(movie => ({ value: movie, label: movie })));
    });
    
  }, []);

  const handleRecommend = async () => {
    if (selectedMovie) {
      setLoading(true)
      const data = await fetchRecommendations(selectedMovie.value);
      setRecommendations(data);
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(movies.length > 0){
      console.log(movies)
      setSelectedMovie(movies[0])
      handleRecommend()
    }
    
  },[movies])



  return (
    <Flex direction="column" gap={4} px={28} py={5} mx="auto" bg={"rgba(227,277,277,0.2)"}>

      <Flex justifyContent={"center"}>
        <Text fontSize="2xl" fontWeight="bold" mb={4} >
            Movie Recommendation System
        </Text>
      </Flex>
      
      <Flex gap={5} w={"100%"} px={"20%"}>
          <Box mb={4} width={"100%"} border={"2px solid white"} borderRadius={5}>
              <Select 
              options={movies} 
              placeholder="Select a movie"
              value={selectedMovie}
              onChange={(selectedOption) => setSelectedMovie(selectedOption)}
              />
          </Box>
          <Button border={"2px solid white"} onClick={handleRecommend} mb={4}>
              Get Recommendations
          </Button>
      </Flex>
      
      {loading && (
        <Box
          h={`${window.innerHeight-100}px`} 
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          >
          <Spinner color="gray.400"></Spinner>
          </Box>
          
      )}

      {recommendations && (
        <Flex wrap="wrap" gap={6} mt={6} justifyContent="space-between">
          {recommendations.movies_name.map((name: string, index: number) => (
            <Box
              key={index}
              w="30%" // 3 Columns in one row
              p={3}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="md"
              bg={"black"}
              color={"white"}
              height={"350px"}
            >
              <Image
                src={recommendations.movies_poster[index]}
                alt={name}
                h={"45%"}
                mb={2}
                mx="auto"
              />
              <Text fontSize="lg" fontWeight="bold" textAlign="center" height={"30px"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"wrap"}>
                {name}
              </Text>
              <Text fontSize="sm" textAlign="center" height={"120px"} overflow="hidden">
                {recommendations.movies_description[index]}
              </Text>
              <Text fontSize="sm" color="white" textAlign="center" height={"30px"}>
                ⭐ {recommendations.movies_rating[index]} / 10
              </Text>
            </Box>
          ))}
          </Flex>
      )}
    </Flex>
  );
};

export default MovieRecommendation;
