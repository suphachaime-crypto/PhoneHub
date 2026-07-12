import {
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";

import { router } from "expo-router";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function CustomDrawer(props: any) {
  return (
    <View style={{ flex: 1, backgroundColor: "#5B21B6" }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 40,
        }}
      >
        <Text style={styles.title}>
          Inventory App
        </Text>

        <DrawerItem
          label="Home"
          labelStyle={styles.label}
          icon={() => (
            <Ionicons
              name="home"
              size={22}
              color="white"
            />
          )}
          onPress={() => router.push("/(tabs)")}
        />

        <DrawerItem
          label="Products"
          labelStyle={styles.label}
          icon={() => (
            <MaterialCommunityIcons
              name="cube"
              size={22}
              color="white"
            />
          )}
          onPress={() =>
            router.push("/(tabs)/products")
          }
        />

        <DrawerItem
          label="Categories"
          labelStyle={styles.label}
          icon={() => (
            <MaterialCommunityIcons
              name="shape"
              size={22}
              color="white"
            />
          )}
          onPress={() =>
            router.push("/(tabs)/categories")
          }
        />

        <DrawerItem
          label="Add Product"
          labelStyle={styles.label}
          icon={() => (
            <Ionicons
              name="add-circle"
              size={22}
              color="white"
            />
          )}
          onPress={() =>
            router.push("/(tabs)/add-product")
          }
        />

                <View style={{ flex: 1 }} />

        <DrawerItem
          label="Logout"
          labelStyle={styles.label}
          icon={() => (
            <MaterialCommunityIcons
              name="logout"
              size={22}
              color="white"
            />
          )}
          onPress={() => router.replace("/login")}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 35,
  },

  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: -10,
  },
});