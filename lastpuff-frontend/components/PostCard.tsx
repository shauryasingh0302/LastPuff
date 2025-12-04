// components/PostCard.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LPColors } from "../constants/theme";
import { Post } from "../types/post";

const screenW = Dimensions.get("window").width;

type Props = {
  post: Post;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onDelete?: (id: string) => void;
  isOwn?: boolean;
};

export default function PostCard({ post, onLike, onComment, onDelete, isOwn }: Props) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{post.author?.name || "Unknown"}</Text>
          <Text style={styles.time}>{new Date(post.createdAt).toLocaleString()}</Text>
        </View>
        {isOwn && onDelete ? (
          <TouchableOpacity onPress={() => onDelete(post._id)}>
            <Ionicons name="trash-outline" size={20} color={LPColors.gray} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Image (if exists) */}
      {post.images?.length > 0 ? (
        <Image source={{ uri: post.images[0].url }} style={styles.image} />
      ) : null}

      {/* Content */}
      {post.content ? <Text style={styles.content}>{post.content}</Text> : null}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => onLike(post._id)}>
          <Ionicons
            name={post.isLiked ? "heart" : "heart-outline"}
            size={20}
            color={post.isLiked ? LPColors.neon : LPColors.gray}
          />
          <Text style={styles.actionText}>{post.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={() => onComment(post._id)}>
          <Ionicons name="chatbubble-outline" size={20} color={LPColors.gray} />
          <Text style={styles.actionText}>{post.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: LPColors.card,
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: LPColors.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: LPColors.neon,
    marginRight: 10,
  },
  name: {
    color: LPColors.text,
    fontWeight: "700",
  },
  time: {
    color: LPColors.gray,
    fontSize: 12,
  },
  image: {
    width: screenW - 32,
    height: (screenW - 32) * 0.66,
    alignSelf: "center",
    backgroundColor: "#222",
  },
  content: {
    color: LPColors.text,
    padding: 12,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingBottom: 12,
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionText: {
    color: LPColors.gray,
    marginLeft: 8,
    fontSize: 13,
  },
});
