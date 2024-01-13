import { useEffect, useState } from "react";
import Axios from "./config/Axios";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  CardFooter,
  Input,
  Button,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import ReactPaginate from "react-paginate";
import useStore from "./store/store.js";

function App() {
  const { movies, setMovies, page, term } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      await Axios.get(`/search/movie?query=${term}&page=${page}`)
        .then(({ data }) => {
          const filteredMovies = {
            ...data,
            results: data?.results?.filter((movie) =>
              !movie?.id ||
              !movie?.title ||
              !movie?.original_language ||
              !movie?.release_date ||
              !movie?.vote_average ||
              !movie?.poster_path ||
              !movie?.overview
                ? null
                : movie
            ),
          };

          setMovies(filteredMovies);
        })
        .catch((err) => console.error(err));
    };

    fetchData();
  }, [page, setMovies, term]);

  return (
    <div className="p-4">
      <PaginatedItems itemsPerPage={movies.page} />
    </div>
  );
}

export default App;

function PaginatedItems() {
  const { movies, setpage, setTerm } = useStore();
  const [input, setInput] = useState("");

  const pageCount = movies?.total_pages;

  const handlePageClick = (event) => {
    setpage(event.selected + 1);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTerm(input);
        }}
        className="flex flex-col m-4"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="movie..."
          size="sm"
          className="text-center mb-2"
        />
        <Button type="submit" colorScheme="blue">
          Search
        </Button>
      </form>
      <Items />
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

function Items() {
  const { movies } = useStore();

  return (
    <div className="flex flex-wrap lg:justify-center  mb-20">
      {movies?.results?.map((result) => (
        <Card
          key={result?.id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          className="lg:w-4/12 m-2"
        >
          <Image
            objectFit="cover"
            loading="lazy"
            maxW={{ base: "100%", sm: "200px" }}
            maxH={{ base: "100%", sm: "200px" }}
            src={`https://image.tmdb.org/t/p/w500${result?.poster_path}`}
            alt={result?.title}
          />
          <Stack>
            <CardBody className="flex flex-col">
              <Heading size="md">{result?.title}</Heading>
              <Text py="2">{result?.overview}</Text>
            </CardBody>
            <CardFooter>
              <Text>{result?.adult ? "+18" : ""}</Text>
              <Text className="flex mb-2">
                <span className="mr-2">
                  {result?.original_language.toUpperCase()}{" "}
                </span>
                <span className="mr-2">
                  {result?.release_date?.split("-")[0]}
                </span>
                <span className="flex flex-row items-center">
                  {result?.vote_average?.toFixed(1)}
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
