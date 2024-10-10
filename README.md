# README

Testing area for my mini-projects.

## Neko-Chan

I want to try a simple page where users can add to favorites or wishlist.

## Datamall

Keep getting errors when trying to use Datamall API. To rectify the erros, modify the Vite to use proxy:

```
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-proxy': {
        // the actual API base domain that we want to call
        target: "https://datamall2.mytransport.sg",
        // hcnage the origin of the request to avoid CORS
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-proxy/, ""),
      }
    }
  }
})
```

In the component, call the **api-proxy** like this:

```
const headers = {
  AccountKey: import.meta.env.VITE_LTA_API_KEY, // Set your own API key
  accept: "application/json",
};

function LtaTest() {
  async function fetchBusArrival(){
    const response = await axios.get("/api-proxy/ltaodataservice/v3/BusArrival?BusStopCode=83139", 
    { headers });

    console.log(response);
  };

  return (
    <div>
      <h1>LTA API Test</h1>
      <button onClick={fetchBusArrival}>Fetch Bus Arrival 83139</button>
    </div>
  );
}
```

## Maps

Learn to use map and populate the map with GeoJSON data.
