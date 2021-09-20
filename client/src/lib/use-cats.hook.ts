import React from "react";
import axios from "axios";
import { Cat } from "./cat.interface";

export function useCats() {
  const [data, setData] = React.useState<Cat[]>();
  const [error, setError] = React.useState();
  const reload = React.useCallback(() => {
    axios
      .get<Cat[]>("/cats")
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  React.useEffect(() => {
    reload();
  }, [reload]);

  return { data, error, loading: !data && !error, reload };
}
