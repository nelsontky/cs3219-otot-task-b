import { Typography, Box } from "@mui/material";
import { useCats } from "../lib/use-cats.hook";
import DemoGet from "./DemoGet";
import DemoPost from "./DemoPost";
import DemoPut from "./DemoPut";
import DemoDelete from "./DemoDelete";

export default function Demo() {
  const { data, loading, reload } = useCats();

  if (loading || !data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <DemoGet cats={data} />
      <DemoPost reload={reload} />
      <DemoPut cats={data} reload={reload} />
      <DemoDelete cats={data} reload={reload} />
    </Box>
  );
}
