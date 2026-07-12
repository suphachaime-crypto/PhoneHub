import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useProducts } from "../../context/ProductContext";

export default function CategoriesScreen() {
  const { products } = useProducts();

  const categories = [
    ...new Set(products.map((item) => item.category)),
  ];

  const renderItem = ({ item }: any) => {
    const count = products.filter(
      (p) => p.category === item
    ).length;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/categories/${item}`)}
      >
        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name="shape"
            size={30}
            color="#2563EB"
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{item}</Text>

          <Text style={styles.count}>
            {count} Products
          </Text>
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={28}
          color="#9CA3AF"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📂 Categories
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Categories
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 4,
  },

  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },

  count: {
    marginTop: 5,
    color: "#6B7280",
    fontSize: 15,
  },

  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 18,
    color: "#9CA3AF",
  },
});