import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import SideMenu from "../../components/SideMenu";

export default function TabsLayout() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />

      <Tabs
        screenOptions={{
          headerShown: true,

          headerStyle: {
            backgroundColor: "#5B21B6",
          },

          headerTintColor: "#fff",

          headerTitleStyle: {
            fontWeight: "bold",
          },

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={{ marginLeft: 15 }}
            >
              <Ionicons
                name="menu"
                size={30}
                color="white"
              />
            </TouchableOpacity>
          ),

          tabBarActiveTintColor: "#2563EB",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="home"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="products"
          options={{
            title: "Products",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="cube"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="categories"
          options={{
            title: "Categories",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="grid"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="add-product"
          options={{
            title: "Add",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="add-circle"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}