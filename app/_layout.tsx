import { Stack } from "expo-router";
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
