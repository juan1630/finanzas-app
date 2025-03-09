import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchData = async (configObj) => {
  
  const [stateData, setStateData] = useState(null);
  const [hasError, setHasError] = useState(null);
  const [isLoadingState, setIsLoadingState] = useState(null);
  const { url, request } = configObj;

  useEffect(() => {
    fetchDataRequest();
  }, [url]);

   const fetchDataRequest = async () => {
      try {
        setIsLoadingState(true);
        const { status, data } = await axios.post(url, { ...request });
        if (status == 200) {
          localStorage.setItem("token", data.token);
          setStateData(data);
          setIsLoadingState(false);
        } else {
          console.log(error);
        }
      } catch (error) {
        setHasError(error);
        console.log(error);
      }
    };

  return { stateData, hasError, isLoadingState};
};
