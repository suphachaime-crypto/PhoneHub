import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProducts } from "../../context/ProductContext";

export default function CategoryScreen() {
  const params = useLocalSearchParams();

  const categoryName = Array.isArray(params.name)
    ? params.name[0]
    : params.name ?? "";

  const { products } = useProducts();

  const categoryProducts = products.filter(
    (item) =>
      item.category.trim().toLowerCase() ===
      categoryName.trim().toLowerCase()
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            item.image && item.image.trim() !== ""
              ? item.image
              : "https://picsum.photos/400",
        }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="cash"
            size={18}
            color="#10B981"
          />
          <Text style={styles.price}>
            ฿ {item.price.toLocaleString()}
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons
            name="archive"
            size={18}
            color="#2563EB"
          />
          <Text style={styles.stock}>
            Stock : {item.stock}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📂 {categoryName}
      </Text>

      <FlatList
        data={categoryProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No Products
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 4,
  },

  image: {
    width: 110,
    height: 110,
    resizeMode: "cover",
  },

  info: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  price: {
    marginLeft: 8,
    fontSize: 16,
    color: "#10B981",
    fontWeight: "bold",
  },

  stock: {
    marginLeft: 8,
    fontSize: 15,
    color: "#6B7280",
  },

  empty: {
    textAlign: "center",
    marginTop: 80,
    fontSize: 18,
    color: "#9CA3AF",
  },
});