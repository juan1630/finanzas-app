import { useState, useEffect } from "react";
import { fetchEgresos } from "../helpers/getCall/fetchEgresos";

export const useHandleData = (url, token) => {
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
        }else {
            setHasError(true)
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        if (error.error.message == "invalid token") {
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
