import { useLocalSearchParams } from "expo-router";
import Bookmarks from "./bookmarks";
import Collections from "./collections";
import Home from "./index";
import Settings from "./settings";

export default function TabResolver() {
  const { tab } = useLocalSearchParams<{ tab: string }>();

  switch (tab) {
    case "bookmarks":
      return <Bookmarks />;
    case "collections":
      return <Collections />;
    case "settings":
      return <Settings />;
    default:
      return <Home />;
  }
}
