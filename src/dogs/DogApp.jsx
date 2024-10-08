import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { SyncLoader } from "react-spinners";
import "./dogStyles.css";


const API_URL = "https://dog.ceo/api/breeds/image/random";

let initialLoad = true;

export function DogApp() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // axios.get(API_URL).then((response) => {
  //   console.log(response.data.message);
  //   // setDog(response.data.message)
  // });

  const getDog = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);

      setDogs((prevState) => {
        return [...prevState, { id: uuid(), url: response.data.message }];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (initialLoad) {
  //     getDog();
  //     initialLoad = false;
  //   }
  // }, []);

  // useEffect initialFetch example
  // https://react.dev/learn/synchronizing-with-effects#fetching-data
  // Using cleanup function
  useEffect(() => {
    let ignore = false;

    async function initialFetch() {
      const result = await axios.get(API_URL);

      if (!ignore) {
        setDogs((prevState) => {
          return [...prevState, { id: uuid(), url: result.data.message }];
        });
      }
    }

    initialFetch();

    // Cleanup function - runs when component unmounts
    return () => {
      ignore = true;
    };
  }, []);

  // useEffect with timer example
  useEffect(() => {
    // setInterval(function, x)
    // run the function every x milliseconds
    const myTimer = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);

    // Cleanup function
    // run when component unmounts or re-renders
    return () => {
      // Remove timer
      clearInterval(myTimer);
    };
  }, []);

  // useEffect to listen to keypress events
  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log("🔑 key pressed:", event.code);

      if (event.code === "Digit1") {
        getDog();
      }
    };

    // chatbot-script.js
    // insert script into the DOM
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup function
    return () => {
      // remove the chatbot script and also HTML element
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <h1>Async Demo</h1>
      <div className="buttons-container">
        <button onClick={getDog}>Get Dog</button>
        <div>{seconds}s elapsed.</div>
      </div>
      {dogs.length === 0 && <p>No dogs available.</p>}
      <div className="dogs-container">
        {dogs.map((dog) => (
          <img key={dog.id} src={dog.url} alt="dog" className="dog-item" />
        ))}
        {isLoading && (
          <div className="spinner-container">
            <SyncLoader color="#5f3dc4" />
          </div>
        )}
      </div>
    </>
  );
}


