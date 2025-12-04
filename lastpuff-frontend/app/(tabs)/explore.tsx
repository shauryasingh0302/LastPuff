// app/(tabs)/explore.tsx

import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LPColors } from "../../constants/theme";
import PostCard from "../../components/PostCard";
import { fetchFeed, fetchMyPosts, toggleLike, deletePost } from "../../services/posts";
import { Post } from "../../types/post";
import { useRouter, useLocalSearchParams } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

export default function ExploreScreen() {
  const auth: any = useContext(AuthContext);
  const user = auth?.user;
  const router = useRouter();
  const params = useLocalSearchParams();

  const [tab, setTab] = useState<"all" | "mine">("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  // Load posts
  const loadPosts = async () => {
    try {
      if (!user?._id) return;
      setLoading(true);

      if (tab === "all") {
        const res = await fetchFeed();
        setPosts(res.data.posts);
      } else {
        const res = await fetchMyPosts(user._id);
        setPosts(res.data.posts);
      }
    } catch (err) {
      console.log("Feed error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load when tab changes
  useEffect(() => {
    loadPosts();
  }, [tab, user]);

  // 🔥 Only refresh ONCE when coming back from comments
  useEffect(() => {
    if (params.refresh === "1") {
      loadPosts();

      // Remove refresh param so it doesn't loop
      router.replace("/(tabs)/explore");
    }
  }, [params.refresh]);

  const handleLike = async (postId: string) => {
    await toggleLike(postId);
    loadPosts();
  };

  const handleComment = (postId: string) => {
    router.push({
      pathname: "/community/Comments",
      params: { postId },
    });
  };

  const handleDelete = async (postId: string) => {
    await deletePost(postId
    );
    loadPosts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/community/AddPost")}
        >
          <Text style={{ color: LPColors.bg, fontWeight: "700" }}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setTab("all")}
          style={[styles.tab, tab === "all" && styles.tabActive]}
        >
          <Text style={tab === "all" ? styles.tabTextActive : styles.tabText}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab("mine")}
          style={[styles.tab, tab === "mine" && styles.tabActive]}
        >
          <Text style={tab === "mine" ? styles.tabTextActive : styles.tabText}>
            My Posts
          </Text>
        </TouchableOpacity>
      </View>

      {/* Posts */}
      <ScrollView style={{ padding: 16 }}>
        {loading ? (
          <Text style={{ color: LPColors.gray, textAlign: "center", marginTop: 20 }}>
            Loading posts...
          </Text>
        ) : posts.length === 0 ? (
          <Text style={{ color: LPColors.gray, textAlign: "center", marginTop: 20 }}>
            No posts available
          </Text>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onDelete={handleDelete}
              isOwn={post.author?._id === user?._id}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LPColors.bg },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 16 },
  title: { color: LPColors.neon, fontSize: 22, fontWeight: "700" },
  addButton: {
    backgroundColor: LPColors.neon,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  tab: { paddingHorizontal: 12, paddingVertical: 8, marginRight: 12 },
  tabActive: { borderBottomWidth: 2, borderBottomColor: LPColors.neon },
  tabText: { color: LPColors.gray },
  tabTextActive: { color: LPColors.neon, fontWeight: "700" },
});
