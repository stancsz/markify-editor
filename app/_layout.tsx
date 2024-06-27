import { Stack } from 'expo-router';
import './global.css'; // Importing global CSS

export default function RootLayout() {
  return (
    <div className="container-fluid p-0" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </div>
  );
}
