import { Box, Typography } from "@mui/material";

import { Cat } from "../lib/cat.interface";

interface DemoGetProps {
  cats: Cat[];
}

export default function DemoGet({ cats }: DemoGetProps) {
  return (
    <Box>
      <Typography variant="h6">GET:</Typography>
      <pre>{JSON.stringify(cats, null, 2)}</pre>
    </Box>
  );
}
