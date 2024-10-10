import axios from "axios";

const headers = {
  AccountKey: import.meta.env.VITE_LTA_API_KEY, // Set your own API key
  accept: "application/json",
};

function LtaTest() {
  async function fetchBusArrival(){
    const response = await axios.get("/api-proxy/ltaodataservice/v3/BusArrival?BusStopCode=83139", { headers });

    console.log(response);
  };

  return (
    <div>
      <h1>LTA API Test</h1>
      <button onClick={fetchBusArrival}>Fetch Bus Arrival 83139</button>
    </div>
  );
}

export default LtaTest;