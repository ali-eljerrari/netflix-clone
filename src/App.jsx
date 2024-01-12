import { useEffect, useState } from "react";
import Axios from "./config/Axios";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const fetchData = async () => {
      await Axios.get(
        "https://api.themoviedb.org/3/search/movie?query=batman&include_adult=false&language=en-US&page=1"
      )
        .then(({ data }) => setData(data))
        .catch((err) => console.error(err));
    };

    //? use this later to fetch real data from the api
    // fetchData();
  }, []);

  return (
    <>
      <h1>It Works! 🚀</h1>
    </>
  );
}

export default App;
