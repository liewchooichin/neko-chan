import { apiInstance, BUS_ARRIVAL } from "./apiUtils";

const headers = {
  AccountKey: import.meta.env.VITE_LTA_API_KEY, // Set your own API key
  accept: "application/json",
};

function LtaTest() {
  async function fetchBusArrival(){
    const response = await apiInstance.get(BUS, { headers });

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