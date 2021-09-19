import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";

import CatFields from "./CatFields";
import { Cat } from "../lib/cat.interface";

interface DemoPutProps {
  cats: Cat[];
  reload: () => void;
}

export default function DemoPut({ cats, reload }: DemoPutProps) {
  const [id, setId] = React.useState("");

  const selectedCat = cats.find((cat) => cat.id === id);

  const getOnSubmit =
    (name: string, age: number) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .put(`/cats/${id}`, { name, age })
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
        PUT:
      </Typography>
      <FormControl fullWidth>
        <InputLabel>Cat</InputLabel>
        <Select
          value={id}
          label="Cat"
          onChange={(e) => {
            setId(e.target.value);
          }}
        >
          {cats.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCat && (
        <CatFields getOnSubmit={getOnSubmit} selectedCat={selectedCat} />
      )}
    </Box>
  );
}
