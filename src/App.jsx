import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Axios from "./config/Axios";

import ReactPaginate from "react-paginate";
import useStore from "./store/store.js";

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { Container, keyframes } from "@chakra-ui/react";

function App() {
  const { movies, setMovies, page, term } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          `/search/movie?query=${term}&page=${page}`
        );

        if (response.status === 200) {
          setMovies(response.data);
        }
      } finally {
        setLoading(false);
      }
    };

    if (term) {
      fetchData();
    }
  }, [loading, page, setMovies, term]);

  return (
    <div className="flex items-center justify-center p-4">
      <PaginatedItems
        itemsPerPage={movies.page}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default App;

// eslint-disable-next-line react/prop-types
function PaginatedItems({ loading, setLoading }) {
  const { movies, setpage, setTerm } = useStore();
  const [input, setInput] = useState("");

  const pageCount = movies?.total_pages;

  const handlePageClick = (event) => {
    setpage(event.selected + 1);
    setLoading(true);
  };

  const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

  const animation = `${animationKeyframes} 400ms ease-in-out infinite`;

  return (
    <div className="flex flex-col items-center jus w-full lg:w-8/12 m-4 max-w-7xl">
      <form
        className={`flex flex-col w-full ${loading ? "mb-40" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          if (input) {
            setTerm(input);
            setInput("");
            setLoading(true);
          }
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a movie..."
          size="sm"
          className="text-center mb-2"
        />
        <Button type="submit" style={{ background: "#FF0080", color: "#fff" }}>
          Search
        </Button>
      </form>
      {loading ? (
        <Container
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            as={motion.div}
            animation={animation}
            padding="2"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            width="12"
            height="12"
            display="flex"
          />
        </Container>
      ) : (
        <>
          <Items />
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<<"
            renderOnZeroPageCount={null}
          />
        </>
      )}
    </div>
  );
}

function Items() {
  const { movies } = useStore();

  return (
    <div className="flex flex-col  flex-wrap justify-center mb-20">
      {movies?.results?.map((result) => (
        <Card
          key={result?.id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="m-2"
        >
          <Image
            objectFit="cover"
            loading="lazy"
            maxW={{ base: "100%", sm: "200px" }}
            maxH={{ base: "100%", sm: "200px" }}
            src={
              result?.poster_path
                ? `https://image.tmdb.org/t/p/w500${result?.poster_path}`
                : "https://unsplash.com/photos/ZnLprInKM7s/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8bm90JTIwZm91bmR8ZW58MHx8fHwxNzA1MTQ4NTE5fDA&force=true&w=640"
            }
            alt={result?.title}
          />
          <Stack>
            <CardBody className="flex flex-col">
              <Heading size="md">{result?.title}</Heading>
              <Text py="2">
                {result?.overview ? result?.overview : "Not Found!"}
              </Text>
            </CardBody>
            <CardFooter>
              <Text>{result?.adult ? "+18" : ""}</Text>
              <Text className="flex mb-2">
                <span className="mr-2">
                  {result?.original_language
                    ? result?.original_language.toUpperCase()
                    : "unknown"}{" "}
                </span>
                <span className="mr-2">
                  {result?.release_date
                    ? result?.release_date?.split("-")[0]
                    : "unknown"}
                </span>
                <span className="flex flex-row items-center">
                  {result?.vote_average
                    ? result?.vote_average?.toFixed(1)
                    : "unknown"}

                  <StarIcon color="yellow.400" className="ml-1" />
                </span>
              </Text>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </div>
  );
}
