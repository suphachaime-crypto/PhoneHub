import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useProducts } from "../../context/ProductContext";

export default function HomeScreen() {
  const { products } = useProducts();

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, item) => sum + item.stock,
    0
  );

  const totalValue = products.reduce(
    (sum, item) => sum + item.price * item.stock,
    0
  );

  const lowStock = products.filter(
    (item) => item.stock <= 5
  );

  const screenWidth = Dimensions.get("window").width;

  const chartData = {
    labels:
      products.length > 0
        ? products.map((item) => item.name)
        : ["Empty"],

    datasets: [
      {
        data:
          products.length > 0
            ? products.map((item) => item.stock)
            : [0],
      },
    ],
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>
        📦 Inventory Dashboard
      </Text>

      <Text style={styles.subHeader}>
        Welcome Back 👋
      </Text>

      <View style={styles.row}>
        <View
          style={[
            styles.card,
            { backgroundColor: "#2563EB" },
          ]}
        >
          <MaterialCommunityIcons
            name="package-variant"
            size={42}
            color="#fff"
          />

          <Text style={styles.number}>
            {totalProducts}
          </Text>

          <Text style={styles.cardText}>
            Products
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: "#10B981" },
          ]}
        >
          <MaterialCommunityIcons
            name="archive"
            size={42}
            color="#fff"
          />

          <Text style={styles.number}>
            {totalStock}
          </Text>

          <Text style={styles.cardText}>
            Stock
          </Text>
        </View>
      </View>

      <View style={styles.valueCard}>
        <MaterialCommunityIcons
          name="cash-multiple"
          size={45}
          color="#F59E0B"
        />

        <Text style={styles.valueTitle}>
          Inventory Value
        </Text>

        <Text style={styles.money}>
          ฿ {totalValue.toLocaleString()}
        </Text>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>
          📊 Stock Overview
        </Text>

        <BarChart
          data={chartData}
          width={screenWidth - 40}
          height={240}
          fromZero
          showValuesOnTopOfBars
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,

            color: (opacity = 1) =>
              `rgba(37,99,235,${opacity})`,

            labelColor: () => "#444",

            propsForBackgroundLines: {
              stroke: "#E5E7EB",
            },
          }}
          style={{
            borderRadius: 16,
            marginTop: 15,
          }}
        />
      </View>

            <View style={styles.listCard}>
        <Text style={styles.listTitle}>
          ⚠️ Low Stock
        </Text>

        {lowStock.length === 0 ? (
          <Text style={styles.empty}>
            ไม่มีสินค้าใกล้หมด
          </Text>
        ) : (
          lowStock.map((item) => (
            <View
              key={item.id}
              style={styles.item}
            >
              <View>
                <Text style={styles.itemName}>
                  {item.name}
                </Text>

                <Text style={styles.itemPrice}>
                  ฿ {item.price.toLocaleString()}
                </Text>
              </View>

              <Text style={styles.stockRed}>
                {item.stock} pcs
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.listCard}>
        <Text style={styles.listTitle}>
          🆕 Latest Products
        </Text>

        {products.length === 0 ? (
          <Text style={styles.empty}>
            ยังไม่มีสินค้า
          </Text>
        ) : (
          products
            .slice(-5)
            .reverse()
            .map((item) => (
              <View
                key={item.id}
                style={styles.item}
              >
                <View>
                  <Text style={styles.itemName}>
                    {item.name}
                  </Text>

                  <Text style={styles.itemPrice}>
                    ฿ {item.price.toLocaleString()}
                  </Text>
                </View>

                <Text style={styles.stock}>
                  {item.stock} pcs
                </Text>
              </View>
            ))
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 15,
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 10,
  },

  subHeader: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    width: "48%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },

  number: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },

  cardText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  valueCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    marginBottom: 15,
  },

  valueTitle: {
    color: "#6B7280",
    fontSize: 16,
    marginTop: 10,
  },

  money: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#10B981",
    marginTop: 10,
  },

  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    marginBottom: 15,
  },

  chartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },

    listCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    elevation: 5,
    marginBottom: 15,
  },

  listTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111827",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  itemName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },

  itemPrice: {
    color: "#6B7280",
    marginTop: 3,
    fontSize: 14,
  },

  stock: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB",
  },

  stockRed: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EF4444",
  },

  empty: {
    textAlign: "center",
    color: "#9CA3AF",
    paddingVertical: 20,
    fontSize: 16,
  },
});