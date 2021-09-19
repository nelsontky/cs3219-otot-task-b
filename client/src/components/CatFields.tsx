import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Cat } from "../lib/cat.interface";

interface CatFieldsProps {
  getOnSubmit: (
    name: string,
    age: number
  ) => (e: React.FormEvent<HTMLFormElement>) => void;

  selectedCat?: Cat;
}

export default function CatFields({
  getOnSubmit,
  selectedCat,
}: CatFieldsProps) {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);

  React.useEffect(() => {
    if (selectedCat) {
      setName(selectedCat.name);
      setAge(selectedCat.age);
    }
  }, [selectedCat]);

  return (
    <Box
      component="form"
      sx={{ marginTop: 2 }}
      onSubmit={getOnSubmit(name, age)}
    >
      <TextField
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        label="Name"
        sx={{ marginRight: 2 }}
      >
        {name}
      </TextField>
      <TextField
        onChange={(e) => {
          setAge(Number(e.target.value));
        }}
        type="number"
        value={age}
        label="Age"
        sx={{ marginRight: 2 }}
      >
        {age}
      </TextField>
      <Button type="submit" variant="contained">
        {!!selectedCat ? "Update" : "Create"}
      </Button>
    </Box>
  );
}
