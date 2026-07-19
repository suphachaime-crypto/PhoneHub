import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  stock: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext =
  createContext<ProductContextType>(
    {} as ProductContextType
  );

const STORAGE_KEY = "PRODUCTS";

const GITHUB_URL =
  "https://raw.githubusercontent.com/suphachaime-crypto/PhoneHub/refs/heads/master/products.json";

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  // โหลดข้อมูลจาก GitHub ก่อน
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(GITHUB_URL);

        if (response.ok) {
          const data = await response.json();

          setProducts(data);

          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
          );
        } else {
          const localData = await AsyncStorage.getItem(
            STORAGE_KEY
          );

          if (localData) {
            setProducts(JSON.parse(localData));
          }
        }
      } catch (error) {
        console.log("Load Error:", error);

        const localData = await AsyncStorage.getItem(
          STORAGE_KEY
        );

        if (localData) {
          setProducts(JSON.parse(localData));
        }
      } finally {
        setLoaded(true);
      }
    };

    loadProducts();
  }, []);

  // บันทึกข้อมูลทุกครั้งที่มีการเปลี่ยนแปลง
  useEffect(() => {
    if (!loaded) return;

    const saveProducts = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(products)
        );
      } catch (error) {
        console.log("Save Error:", error);
      }
    };

    saveProducts();
  }, [products, loaded]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id ? product : item
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () =>
  useContext(ProductContext);