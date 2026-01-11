import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmModal from "@src/components/common/ConfirmModal";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../services/api";
import { RootState } from "../store/store";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const [logout] = useLogoutMutation();

  const logoutUser = async () => {
    try {
      await AsyncStorage.multiRemove([
        "userId",
        "access_token",
        "refresh_token",
      ]);

      await logout();
      router.replace("/");
    } catch (e) {
      console.log("Logout error", e);
    }
  };

  const handleLogoutPress = () => {
    toggleDropdown();
    setTimeout(() => {
      setModalVisible(true); 
    }, 250);
  };

  // Function to handle modal confirm
  const handleConfirmLogout = () => {
    setModalVisible(false);
    logoutUser();
  };

  const toggleDropdown = () => {
    if (!dropdownVisible) {
      setDropdownVisible(true);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setDropdownVisible(false));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Gradient Background */}
        <View style={styles.headerContainer}>
          <View style={styles.gradientHeader}>
            <View style={styles.header}>
              <View>
                <Text style={styles.hello}>Hello, Welcome Back</Text>
                <Text style={styles.name}>{user?.username || "Guest"}!</Text>
              </View>
              <TouchableOpacity
                onPress={toggleDropdown}
                style={styles.avatarWrapper}
                activeOpacity={0.8}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.username?.charAt(0).toUpperCase() || "G"}
                  </Text>
                </View>
                <View style={styles.onlineDot} />
              </TouchableOpacity>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>247</Text>
                <Text style={styles.statLabel}>Bookmarks</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Collections</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Shared</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Profile Dropdown */}
        {dropdownVisible && (
          <Modal transparent visible={dropdownVisible} animationType="none">
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={toggleDropdown}
            >
              <Animated.View
                style={[
                  styles.dropdown,
                  {
                    transform: [{ scale: scaleAnim }],
                    opacity: scaleAnim,
                  },
                ]}
              >
                <View style={styles.dropdownHeader}>
                  <View style={styles.dropdownAvatar}>
                    <Text style={styles.dropdownAvatarText}>
                      {user?.username?.charAt(0).toUpperCase() || "G"}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.dropdownName}>
                      {user?.username || "Guest"}
                    </Text>
                    <Text style={styles.dropdownEmail}>
                      {user?.email || "guest@example.com"}
                    </Text>
                  </View>
                </View>

                <View style={styles.dropdownDivider} />

                <DropdownItem icon="👤" label="My Profile"  />
                <DropdownItem icon="⚙️" label="Settings" onPress={()=>{
                  toggleDropdown();
                  router.push("/settings");
                }}/>
                <DropdownItem icon="🔔" label="Notifications" badge="3" />
                <DropdownItem icon="⭐" label="Favorites" />
                <DropdownItem icon="📊" label="Analytics" />

                <View style={styles.dropdownDivider} />

                <DropdownItem
                  icon="🚪"
                  label="Logout"
                  danger
                  onPress={handleLogoutPress}
                />
              </Animated.View>
            </TouchableOpacity>
          </Modal>
        )}

        {/* Search Box */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchText}>Search bookmarks...</Text>
          <View style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚡</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoryRow}>
          <Category icon="🔗" label="Links" color="#667EEA" count="128" />
          <Category icon="🖼️" label="Images" color="#F093FB" count="64" />
          <Category icon="📄" label="Docs" color="#4FACFE" count="55" />
        </View>

        {/* Collections Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>My Collections</Text>
            <Text style={styles.sectionSubtitle}>Organize your content</Text>
          </View>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAll}>See All</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.collectionScroll}
        >
          <Collection
            title="Inspiration"
            count="32 items"
            color="#FFE5E5"
            emoji="✨"
          />
          <Collection
            title="Catboosters"
            count="163 items"
            color="#E5F5FF"
            emoji="🚀"
          />
          <Collection
            title="Brain Foods"
            count="26 items"
            color="#FFF4E5"
            emoji="🧠"
          />
          <Collection
            title="Design"
            count="48 items"
            color="#F0E5FF"
            emoji="🎨"
          />
        </ScrollView>

        {/* Recent Bookmarks */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recent Bookmarks</Text>
            <Text style={styles.sectionSubtitle}>Last 7 days</Text>
          </View>
        </View>

        <RecentCard
          title="Top UI/UX Design Works for Inspiration"
          subtitle="UI & UX Design"
          time="12:21"
          color="#667EEA"
          icon="🎨"
        />
        <RecentCard
          title="React Native Best Practices 2024"
          subtitle="Development"
          time="10:45"
          color="#F093FB"
          icon="⚛️"
        />
        <RecentCard
          title="Color Psychology in Design"
          subtitle="Design Theory"
          time="Yesterday"
          color="#4FACFE"
          icon="🌈"
        />

        <View style={{ height: 20 }} />
      </ScrollView>

      <ConfirmModal
        visible={modalVisible}
        title="Confirm Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={handleConfirmLogout}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
}

/* ---------------- COMPONENTS ---------------- */

function DropdownItem({
  icon,
  label,
  danger,
  badge,
  onPress,
}: {
  icon: string;
  label: string;
  danger?: boolean;
  badge?: string;
  onPress?: () => void;
}) {
  return (
    <>
      <TouchableOpacity
        style={styles.dropdownItem}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text style={styles.dropdownIcon}>{icon}</Text>
        <Text style={[styles.dropdownLabel, danger && styles.dangerText]}>
          {label}
        </Text>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}

function Category({
  icon,
  label,
  color,
  count,
}: {
  icon: string;
  label: string;
  color: string;
  count: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={[styles.categoryCard, { backgroundColor: color + "20" }]}>
        <View style={[styles.categoryIconWrapper, { backgroundColor: color }]}>
          <Text style={styles.categoryIcon}>{icon}</Text>
        </View>
        <Text style={styles.categoryText}>{label}</Text>
        <Text style={styles.categoryCount}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}

function Collection({
  title,
  count,
  color,
  emoji,
}: {
  title: string;
  count: string;
  color: string;
  emoji: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={[styles.collectionCard, { backgroundColor: color }]}>
        <View style={styles.collectionHeader}>
          <Text style={styles.collectionEmoji}>{emoji}</Text>
          <View style={styles.moreButton}>
            <Text style={styles.moreText}>⋯</Text>
          </View>
        </View>
        <Text style={styles.collectionTitle}>{title}</Text>
        <Text style={styles.collectionCount}>{count}</Text>
        <View style={styles.collectionFooter}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function RecentCard({
  title,
  subtitle,
  time,
  color,
  icon,
}: {
  title: string;
  subtitle: string;
  time: string;
  color: string;
  icon: string;
}) {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.recentCard}>
        <View
          style={[styles.recentIconWrapper, { backgroundColor: color + "20" }]}
        >
          <Text style={styles.recentIcon}>{icon}</Text>
        </View>
        <View style={styles.recentContent}>
          <Text style={styles.recentTitle} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.recentFooter}>
            <Text style={styles.recentSubtitle}>{subtitle}</Text>
            <Text style={styles.recentDot}>•</Text>
            <Text style={styles.recentTime}>{time}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreIconButton}>
          <Text style={styles.moreIcon}>⋮</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FE",
    paddingBottom: 100,
  },
  headerContainer: {
    marginBottom: 20,
  },
  gradientHeader: {
    backgroundColor: "#667EEA",
    borderRadius: 30,
    padding: 20,
    shadowColor: "#667EEA",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  hello: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#667EEA",
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4ADE80",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-around",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 10,
  },
  searchBox: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 24,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchText: {
    flex: 1,
    color: "#A0AEC0",
    fontSize: 15,
  },
  filterButton: {
    backgroundColor: "#667EEA",
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    fontSize: 16,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  categoryCard: {
    width: width * 0.28,
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  categoryIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 11,
    color: "#718096",
    fontWeight: "600",
  },
  sectionHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2D3748",
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#A0AEC0",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  seeAll: {
    color: "#667EEA",
    fontWeight: "700",
    fontSize: 13,
    marginRight: 4,
  },
  arrow: {
    color: "#667EEA",
    fontSize: 14,
    fontWeight: "700",
  },
  collectionScroll: {
    marginBottom: 28,
    paddingLeft: 20,
  },
  collectionCard: {
    width: 160,
    borderRadius: 20,
    padding: 16,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  collectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  collectionEmoji: {
    fontSize: 32,
  },
  moreButton: {
    width: 24,
    height: 24,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: {
    fontSize: 16,
    color: "#718096",
    fontWeight: "700",
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 4,
  },
  collectionCount: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 12,
  },
  collectionFooter: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "65%",
    backgroundColor: "#667EEA",
    borderRadius: 2,
  },
  recentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recentIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recentIcon: {
    fontSize: 26,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 6,
    lineHeight: 20,
  },
  recentFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  recentSubtitle: {
    fontSize: 12,
    color: "#718096",
  },
  recentDot: {
    fontSize: 12,
    color: "#CBD5E0",
    marginHorizontal: 6,
  },
  recentTime: {
    fontSize: 12,
    color: "#A0AEC0",
  },
  moreIconButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  moreIcon: {
    fontSize: 20,
    color: "#A0AEC0",
    fontWeight: "700",
  },

  // Dropdown Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    position: "absolute",
    top: 100,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: 280,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    overflow: "hidden",
  },
  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F7FAFC",
  },
  dropdownAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#667EEA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dropdownAvatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  dropdownName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 2,
  },
  dropdownEmail: {
    fontSize: 12,
    color: "#718096",
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical: 14,
  },
  dropdownIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  dropdownLabel: {
    flex: 1,
    fontSize: 15,
    color: "#2D3748",
    fontWeight: "600",
  },
  dangerText: {
    color: "#E53E3E",
  },
  badge: {
    backgroundColor: "#667EEA",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
