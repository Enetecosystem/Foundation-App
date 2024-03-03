import { Stack } from "expo-router";


export default function MainLayout() {


  return (

    <Stack screenOptions={{}}>
      <Stack.Screen options={{ headerShown: false }} />
    </Stack>

  );
}
