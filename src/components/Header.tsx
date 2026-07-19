import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Header() {
  const [visible, setVisible] = useState(false);

  const go = (path: string) => {
    setVisible(false);
    router.push(path as any);
  };

  return (
    <>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuButton}
            activeOpacity={0.7}
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            }}
            onPress={() => setVisible(true)}
          >
            <Ionicons
              name="menu"
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.title}>
            Inventory App
          </Text>

          <TouchableOpacity activeOpacity={0.7}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150?img=12",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <Pressable style={styles.menu}>
            <Text style={styles.menuTitle}>
              ☰ Menu
            </Text>

            <TouchableOpacity
              style={styles.item}
              onPress={() => go("/")}
            >
              <Ionicons
                name="home"
                size={22}
                color="#2563EB"
              />
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => go("/products")}
            >
              <MaterialCommunityIcons
                name="cube"
                size={22}
                color="#2563EB"
              />
              <Text style={styles.text}>
                Products
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => go("/categories")}
            >
              <MaterialCommunityIcons
                name="shape"
                size={22}
                color="#2563EB"
              />
              <Text style={styles.text}>
                Categories
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => go("/add-product")}
            >
              <Ionicons
                name="add-circle"
                size={22}
                color="#2563EB"
              />
              <Text style={styles.text}>
                Add Product
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                setVisible(false);
                router.replace("/login");
              }}
            >
              <MaterialCommunityIcons
                name="logout"
                size={22}
                color="red"
              />
              <Text
                style={[
                  styles.text,
                  { color: "red" },
                ]}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#5B21B6",
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#5B21B6",
  },

  menuButton: {
    padding: 8,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  menu: {
    width: 270,
    backgroundColor: "#FFFFFF",
    marginTop: 90,
    marginLeft: 12,
    borderRadius: 20,
    padding: 20,
    elevation: 8,
  },

  menuTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  text: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
  },
});