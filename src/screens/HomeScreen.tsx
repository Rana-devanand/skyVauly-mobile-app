import { Feather } from "@node_modules/@expo/vector-icons/build/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmModal from "@src/components/common/ConfirmModal";
import Separator from "@src/components/common/Separator";
import { Category, Collection, DropdownItem, RecentCard } from "@src/components/home";
import { styles } from "@src/components/home/style";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../services/api";
import { RootState } from "../store/store";

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

                <DropdownItem icon="👤" label="My Profile" />
                <DropdownItem
                  icon="⚙️"
                  label="Settings"
                  onPress={() => {
                    toggleDropdown();
                    router.push("/settings");
                  }}
                />
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
          <Text style={styles.searchIcon}>
            <Feather name="search" size={24} color="#9c9c9cff" />
          </Text>
          <Text style={styles.searchText}>Search bookmarks...</Text>
        </View>

        {/* Categories */}
        <View style={styles.categoryRow}>
          <Category
            icon="external-link"
            label="Links"
            color="#667EEA"
            count="128"
          />
          <Category icon="image" label="Images" color="#F093FB" count="64" />
          <Category icon="file-text" label="Docs" color="#4FACFE" count="55" />
        </View>

        <Separator style={{ marginVertical: 10 }} />
        {/* Collections Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>My Collections</Text>
            <Text style={styles.sectionSubtitle}>Organize your content</Text>
          </View>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAll}>See All</Text>
            <Text style={styles.arrow}>
              <Feather name="arrow-right" size={12} color="#667EEA" />
            </Text>
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
            icon="folder-open"
          />

          <Collection
            title="Catboosters"
            count="163 items"
            color="#E5F5FF"
            icon="folder-open"
          />

          <Collection
            title="Brain Foods"
            count="26 items"
            color="#FFF4E5"
            icon="folder-open"
          />

          <Collection
            title="Design"
            count="48 items"
            color="#F0E5FF"
            icon="folder-open"
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
          icon="folder-open"
        />
        <RecentCard
          title="React Native Best Practices 2024"
          subtitle="Development"
          time="10:45"
          color="#F093FB"
          icon="folder-open"
        />
        <RecentCard
          title="Color Psychology in Design"
          subtitle="Design Theory"
          time="Yesterday"
          color="#4FACFE"
          icon="folder-open"
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
