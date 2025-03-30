import { useState, useEffect } from "react";
import { fetchEgresos } from "../helpers/getCall/fetchEgresos";

const token = localStorage.getItem("token");

export const useHandleData = (url) => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetchEgresos(url, {
      token,
    })
      .then((data) => {
        setIsLoading(false);
        if (data.length > 0) {
          setDataList(data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setHasError(error.error);
        if (error.message == "invalid token") {
          dispatch(logout());
          localStorage.clear();
        }
      });
  }, [url]);

  return {
    dataList,
    isLoading,
    hasError,
  };
};
