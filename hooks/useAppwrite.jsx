import { useState } from "react";
import { useEffect } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fn();
      //   console.log(response);
      setData(response);
    } catch (error) {
      //   console.log("error while fetching all posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
