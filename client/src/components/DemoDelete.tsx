import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import axios from "axios";

import { Cat } from "../lib/cat.interface";

interface DemoDeleteProps {
  cats: Cat[];
  reload: () => void;
}

export default function DemoDelete({ cats, reload }: DemoDeleteProps) {
  const [id, setId] = React.useState("");

  const selectedCat = cats.find((cat) => cat.id === id);
  React.useEffect(() => {
    if (!selectedCat) {
      setId("");
    }
  }, [selectedCat]);

  const onSubmit = () => {
    axios
      .delete(`/cats/${id}`)
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
        DELETE:
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
      <Button variant="contained" disabled={id.length === 0} onClick={onSubmit}>
        Delete
      </Button>
    </Box>
  );
}
