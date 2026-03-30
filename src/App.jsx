import { useEffect } from "react";
import axios from "axios";

function App() {

  useEffect(() => {
    async function testApi() {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          },
        );

        console.log("SUCCESS ✅", res.data);
      } catch (err) {
        console.log("ERROR ❌", err.response?.data || err.message);
      }
    }

    testApi();
  }, []);

  return <h1>Test API</h1>;
}

export default App;
