import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProducts } from "../../context/ProductContext";

export default function ProductsScreen() {
  const { products, deleteProduct } = useProducts();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const filteredProducts = products.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.category === filter;

    return matchSearch && matchFilter;
  });

  const confirmDelete = (id: string, name: string) => {
    Alert.alert(
      "Delete Product",
      `Delete "${name}" ?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteProduct(id),
        },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            item.image && item.image.trim() !== ""
              ? item.image
              : "https://picsum.photos/500",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.categoryRow}>
          <MaterialCommunityIcons
            name="shape"
            size={16}
            color="#2563EB"
          />

          <Text style={styles.category}>
            {item.category}
          </Text>
        </View>

        <Text style={styles.price}>
          ฿ {item.price.toLocaleString()}
        </Text>

        <Text style={styles.stock}>
          Stock : {item.stock}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              router.push({
                pathname: "/edit-product",
                params: {
                  id: item.id,
                },
              })
            }
          >
            <MaterialCommunityIcons
              name="pencil"
              color="#fff"
              size={20}
            />

            <Text style={styles.buttonText}>
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              confirmDelete(item.id, item.name)
            }
          >
            <MaterialCommunityIcons
              name="delete"
              color="#fff"
              size={20}
            />

            <Text style={styles.buttonText}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        📦 Products
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search Product..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setFilter(item)}
            style={[
              styles.filterButton,
              filter === item &&
                styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item &&
                  styles.filterTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        data={filteredProducts}
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 15,
  },

  search: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },

  filterList: {
    marginBottom: 15,
  },

  filterButton: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },

  filterButtonActive: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    color: "#374151",
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  content: {
    padding: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  category: {
    marginLeft: 6,
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "600",
  },

  price: {
    marginTop: 10,
    fontSize: 18,
    color: "#10B981",
    fontWeight: "bold",
  },

  stock: {
    marginTop: 6,
    fontSize: 16,
    color: "#6B7280",
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 18,
  },

  editButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },

  deleteButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#EF4444",
    padding: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 15,
  },

  empty: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 18,
    color: "#9CA3AF",
  },
});