import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProducts } from "../context/ProductContext";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams();

  const { products, updateProduct } = useProducts();

  const product = products.find(
    (item) => item.id === id
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setImage(product.image);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
    }
  }, [product]);

  const saveEdit = () => {
    if (!product) return;

    if (
      !name ||
      !category ||
      !image ||
      !price ||
      !stock
    ) {
      Alert.alert(
        "แจ้งเตือน",
        "กรุณากรอกข้อมูลให้ครบ"
      );
      return;
    }

    updateProduct({
      id: product.id,
      name,
      category,
      image,
      price: Number(price),
      stock: Number(stock),
    });

    Alert.alert(
      "สำเร็จ",
      "แก้ไขสินค้าเรียบร้อย"
    );

    router.back();
  };

  if (!product) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>ไม่พบสินค้า</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        ✏️ Edit Product
      </Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
        />

        {image !== "" && (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.input}
          placeholder="Stock"
          keyboardType="numeric"
          value={stock}
          onChangeText={setStock}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={saveEdit}
        >
          <Text style={styles.buttonText}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
  },

    input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 15,
    resizeMode: "cover",
    backgroundColor: "#E5E7EB",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});