import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function HomeScreen() {

  //  get user data from the store
  const { user } = useSelector((state : RootState) => state.auth);
  console.log({user})
  console.log(user.username)
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.name}>{user.username}!</Text>
        </View>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Feather name="search" size={18} color="#aaa" />
        <Text style={styles.searchText}>Search your bookmark</Text>
      </View>

      {/* Categories */}
      <View style={styles.categoryRow}>
        <Category icon="link" label="Links" color="#C9B6FF" />
        <Category icon="image" label="Images" color="#BFE4FF" />
        <Category icon="file-document" label="Documents" color="#FFD6D6" />
      </View>

      {/* Collections */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Collections</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.collectionRow}>
        <Collection title="Inspiration" count="32 items" />
        <Collection title="Catboosters" count="163 items" />
        <Collection title="Brain Foods" count="26 items" />
      </View>

      {/* Recent */}
      <Text style={styles.sectionTitle}>Recent bookmark</Text>

      <View style={styles.recentCard}>
        <Image
          source={{ uri: "https://picsum.photos/100" }}
          style={styles.recentImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.recentTitle}>
            Top UI/UX Design Works for Inspiration
          </Text>
          <Text style={styles.recentSubtitle}>
            UI & UX Design Inspiration · 12:21
          </Text>
        </View>
        <Feather name="more-horizontal" size={20} color="#888" />
      </View>
    </View>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Category({ icon, label, color }: any) {
  return (
    <View style={[styles.categoryCard, { backgroundColor: color }]}>
      <MaterialCommunityIcons name={icon} size={26} color="#fff" />
      <Text style={styles.categoryText}>{label}</Text>
    </View>
  );
}

function Collection({ title, count }: any) {
  return (
    <View style={styles.collectionCard}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/716/716784.png",
        }}
        style={styles.folderIcon}
      />
      <Text style={styles.collectionTitle}>{title}</Text>
      <Text style={styles.collectionCount}>{count}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hello: {
    fontSize: 16,
    color: "#888",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E2A47",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  searchBox: {
    marginVertical: 20,
    backgroundColor: "#F3F5F9",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  searchText: {
    marginLeft: 10,
    color: "#999",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "30%",
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    marginTop: 6,
    color: "#fff",
    fontWeight: "600",
  },
  sectionHeader: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E2A47",
  },
  seeAll: {
    color: "#6A5AE0",
  },
  collectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  collectionCard: {
    width: "30%",
    backgroundColor: "#FFF4D6",
    borderRadius: 18,
    alignItems: "center",
    padding: 12,
  },
  folderIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  collectionTitle: {
    fontWeight: "600",
  },
  collectionCount: {
    fontSize: 12,
    color: "#777",
  },
  recentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FC",
    borderRadius: 16,
    padding: 12,
    marginTop: 14,
  },
  recentImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  recentTitle: {
    fontWeight: "600",
  },
  recentSubtitle: {
    fontSize: 12,
    color: "#888",
  },
});
