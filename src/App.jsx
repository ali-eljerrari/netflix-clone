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
          setMovies(data);
        })
        .catch((err) => console.error(err));
    };

    if (term) {
      fetchData();
    }
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
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
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
