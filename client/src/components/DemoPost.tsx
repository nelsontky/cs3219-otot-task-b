import { Box, Typography } from "@mui/material";
import React from "react";
import axios from "axios";

import CatFields from "./CatFields";

interface DemoPostProps {
  reload: () => void;
}

export default function DemoPost({ reload }: DemoPostProps) {
  const getOnSubmit =
    (name: string, age: number) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post(`/cats`, { name, age })
        .then(() => {
          reload();
        })
        .catch((error) => {
          if (error.response) {
            window.alert(JSON.stringify(error.response.data));
          } else {
            window.alert("An unspecified error has occurred");
          }
        });
    };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        POST:
      </Typography>
      <CatFields getOnSubmit={getOnSubmit} />
    </Box>
  );
}
