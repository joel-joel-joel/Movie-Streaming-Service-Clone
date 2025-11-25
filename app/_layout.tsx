import { Stack } from "expo-router";
import "./globals.css"

export default function RootLayout() {
  return <Stack>
      /* Hide tab bar on all screens */
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>

      // Hide header on movie details screen/
      <Stack.Screen name="movie/[id]"
                    options={{headerShown: false}}/>
      </Stack>;
}
