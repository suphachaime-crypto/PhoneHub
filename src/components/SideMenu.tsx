import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

import { router } from "expo-router";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function SideMenu({
  visible,
  onClose,
}: Props) {
  const go = (path: any) => {
    onClose();
    router.push(path);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
    >
      <View style={styles.overlay}>
        <View style={styles.menu}>
          <Text style={styles.title}>
            Inventory
          </Text>

          <TouchableOpacity
            style={styles.item}
            onPress={() => go("/(tabs)")}
          >
            <Ionicons
              name="home"
              size={24}
              color="white"
            />

            <Text style={styles.text}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              go("/(tabs)/products")
            }
          >
            <MaterialCommunityIcons
              name="cube"
              size={24}
              color="white"
            />

            <Text style={styles.text}>
              Products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              go("/(tabs)/categories")
            }
          >
            <MaterialCommunityIcons
              name="shape"
              size={24}
              color="white"
            />

            <Text style={styles.text}>
              Categories
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              go("/(tabs)/add-product")
            }
          >
            <Ionicons
              name="add-circle"
              size={24}
              color="white"
            />

            <Text style={styles.text}>
              Add Product
            </Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              onClose();
              router.replace("/login");
            }}
          >
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color="white"
            />

            <Text style={styles.text}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={onClose}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  menu: {
    width: 270,
    backgroundColor: "#5B21B6",
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },

  text: {
    color: "white",
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
  },
});