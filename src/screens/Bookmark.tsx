import {
  Image,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BookmarkItem = ({ item }: { item: any }) => {
  // Construct metadata: Source + Folder (if exists) + Time
  const folderDisplay = item.folder
    ? `${item.folderIcon || "📁"} ${item.folder}`
    : "";
  const sourceDisplay = item.source || "";
  const metaParts = [sourceDisplay, folderDisplay].filter(Boolean).join(" ");

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.metadata} numberOfLines={1}>
          {metaParts} • {item.time}
        </Text>
      </View>

      <TouchableOpacity style={styles.menuButton} hitSlop={8}>
        <Text style={styles.menuDots}>⋯</Text>
      </TouchableOpacity>
    </View>
  );
};

const Bookmark = () => {
  const sections = [
    {
      title: "Today",
      data: [
        {
          id: "1",
          title: "Top UI/UX Design Works for inspiration",
          source: "",
          folder: "Inspiration",
          folderIcon: "🌈",
          time: "12:21",
          thumbnail: "https://picsum.photos/100?random=1",
        },
        {
          id: "2",
          title: "3 tips for research newbies",
          source: "Medium",
          folder: "Unsorted",
          folderIcon: "📁",
          time: "11:10",
          thumbnail: "https://picsum.photos/100?random=2",
        },
        {
          id: "3",
          title: "High quality wallpapers",
          source: "Reddit",
          folder: "Unsorted",
          folderIcon: "📁",
          time: "07:32",
          thumbnail: "https://picsum.photos/100?random=3",
        },
      ],
    },
    {
      title: "Yesterday",
      data: [
        {
          id: "4",
          title: "30 Times Cats Cracked Us Up",
          source: "Boredpanda",
          folder: "Catboosters",
          folderIcon: "🐱",
          time: "Yesterday",
          thumbnail: "https://picsum.photos/100?random=4",
        },
        {
          id: "5",
          title: "Color Theory for Designers",
          source: "Smashing Magazine",
          folder: "Grain Foods",
          folderIcon: "📁",
          time: "Yesterday",
          thumbnail: "https://picsum.photos/100?random=5",
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookmarkItem item={item} />}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.pageTitle}>Bookmarks</Text>
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                placeholder="Search your bookmark"
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
              />
            </View>
          </View>
        }
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listHeader: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: "#9CA3AF",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    padding: 0, // Remove default padding on iOS
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center", // Critical: vertically centers thumbnail with text
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  contentContainer: {
    flex: 1, // Takes available space, enables truncation
    marginHorizontal: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },
  metadata: {
    fontSize: 14,
    color: "#6B7280",
  },
  menuButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  menuDots: {
    fontSize: 20,
    color: "#9CA3AF",
    letterSpacing: 2,
    marginTop: -4, // Visual centering for the dots character
  },
});

export default Bookmark;
