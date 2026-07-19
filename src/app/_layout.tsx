import { Stack } from "expo-router";
import { ProductProvider } from "../context/ProductContext";

export default function RootLayout() {
  return (
    <ProductProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="edit-product" />
        <Stack.Screen name="categories/[name]" />
      </Stack>
    </ProductProvider>
  );
}