import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function CustomDrawer() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory App</Text>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/(tabs)")}
      >
        <Ionicons name="home" size={22} color="white" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/(tabs)/products")}
      >
        <MaterialCommunityIcons
          name="cube"
          size={22}
          color="white"
        />
        <Text style={styles.label}>Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/(tabs)/categories")}
      >
        <MaterialCommunityIcons
          name="shape"
          size={22}
          color="white"
        />
        <Text style={styles.label}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push("/(tabs)/add-product")}
      >
        <Ionicons
          name="add-circle"
          size={22}
          color="white"
        />
        <Text style={styles.label}>Add Product</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={styles.item}
        onPress={() => router.replace("/login")}
      >
        <MaterialCommunityIcons
          name="logout"
          size={22}
          color="white"
        />
        <Text style={styles.label}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5B21B6",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },

  label: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
  },
});