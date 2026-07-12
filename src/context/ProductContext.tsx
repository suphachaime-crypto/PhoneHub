import React, {
  createContext,
  useContext,
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

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<Product[]>([]);

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