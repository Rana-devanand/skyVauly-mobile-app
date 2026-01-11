import { AntDesign, Feather } from "@node_modules/@expo/vector-icons/build/Icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

export const RecentCard = ({
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
  icon: any;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.recentCard}>
        <View
          style={[styles.recentIconWrapper, { backgroundColor: color + "20" }]}
        >
          <Text style={styles.recentIcon}>
            <AntDesign name={icon} color="#f4c700ff" size={28} />
          </Text>
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
};

export const Collection = ({
  title,
  count,
  color,
  icon,
}: {
  title: string;
  count: string;
  color: string;
  icon: any;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={[styles.collectionCard, { backgroundColor: color }]}>
        <View style={styles.collectionHeader}>
          <Text style={styles.collectionEmoji}>
            <AntDesign name={icon} color="#ffd146ff" size={24} />
          </Text>
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
};

export const DropdownItem = ({
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
}) => {
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
};

export const Category = ({
  icon,
  label,
  color,
  count,
}: {
  icon: any;
  label: string;
  color: string;
  count: string;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={[styles.categoryCard, { backgroundColor: color + "20" }]}>
        <View
          style={[
            styles.categoryIconWrapper,
            { backgroundColor: color + "15" },
          ]}
        >
          <Text style={styles.categoryIcon}>
            <Feather name={icon} color={color} size={24} />
          </Text>
        </View>
        <Text style={styles.categoryText}>{label}</Text>
        <Text style={styles.categoryCount}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
}
