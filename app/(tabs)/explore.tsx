import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Community</Text>
          <Text style={styles.headerSubtitle}>Get Support • Support • Discussions</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Share Progress Card */}
        <View style={styles.shareCard}>
          <View style={styles.shareHeader}>
            <View style={styles.avatar} />
            <View style={styles.shareTextContainer}>
              <Text style={styles.shareTitle}>Share your progress or ask for</Text>
              <Text style={styles.shareTitle}>support</Text>
            </View>
          </View>
          <View style={styles.shareButtons}>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="image-outline" size={16} color="#0E6B8A" />
              <Text style={styles.shareButtonText}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="attach-outline" size={16} color="#0E6B8A" />
              <Text style={styles.shareButtonText}>Attach</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Ionicons name="people-outline" size={16} color="#0E6B8A" />
              <Text style={styles.shareButtonText}>Anon</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Call Squad Section */}
        <View style={styles.callSquadCard}>
          <Text style={styles.callSquadTitle}>Your Call Squad: Dawn Shifters</Text>
          <Text style={styles.callSquadSubtitle}>8 members • Daily check-ins</Text>
          <TouchableOpacity style={styles.viewSquadButton}>
            <Text style={styles.viewSquadButtonText}>View Squad</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabTextActive}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Tips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Cravings Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Success Stories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Motivation</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Trending Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending</Text>
          
          <View style={styles.trendingCard}>
            <View style={styles.trendingHeader}>
              <Text style={styles.trendingBadge}>How do people manage this</Text>
              <Text style={styles.trendingTime}>Day 26 (start)</Text>
            </View>
            <Text style={styles.trendingTitle}>First week people manage cravings this week</Text>
            <Text style={styles.trendingText}>Anyone people tried worked?</Text>
          </View>

          <View style={styles.trendingCard}>
            <View style={styles.trendingHeader}>
              <Text style={styles.trendingBadge}>My 1st</Text>
              <Text style={styles.trendingTime}>Energy and all</Text>
            </View>
            <Text style={styles.trendingText}>Finally starting meditation habit!</Text>
          </View>
        </View>

        {/* Community Achievements */}
        <View style={styles.section}>
          <View style={styles.achievementHeader}>
            <Text style={styles.sectionTitle}>Community Achievements</Text>
            <Text style={styles.achievementBadge}>Collective impact</Text>
          </View>
          
          <View style={styles.achievementStats}>
            <View style={styles.achievementStat}>
              <Ionicons name="flame-outline" size={20} color="#0E6B8A" />
              <Text style={styles.achievementLabel}>Cravings</Text>
              <Text style={styles.achievementValue}>₹1.2M</Text>
            </View>
            <View style={styles.achievementStat}>
              <Ionicons name="ribbon-outline" size={20} color="#0E6B8A" />
              <Text style={styles.achievementLabel}>Avoided</Text>
              <Text style={styles.achievementValue}>92k</Text>
            </View>
            <View style={styles.achievementStat}>
              <Ionicons name="people-outline" size={20} color="#0E6B8A" />
              <Text style={styles.achievementLabel}>Top Contributors</Text>
              <Text style={styles.achievementValue}>63 days • 51 days offline</Text>
            </View>
          </View>
        </View>

        {/* Community Posts */}
        <View style={styles.postsSection}>
          {/* Post 1 */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar} />
              <View style={styles.postInfo}>
                <View style={styles.postUserRow}>
                  <Text style={styles.postUsername}>Asha</Text>
                  <View style={styles.postBadge}>
                    <Text style={styles.postBadgeText}>15 days smoke-free</Text>
                  </View>
                </View>
                <Text style={styles.postTime}>6h ago</Text>
              </View>
            </View>
            <Text style={styles.postText}>First weekend without a smoke. Morning tea was the hardest, but a quick walk + deep breathing really helped!</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="arrow-up-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Upvote</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="chatbubble-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="repeat-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Repost</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="heart-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Post 2 */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar} />
              <View style={styles.postInfo}>
                <View style={styles.postUserRow}>
                  <Text style={styles.postUsername}>Ravi</Text>
                  <View style={styles.postBadge}>
                    <Text style={styles.postBadgeText}>4 days smoke-free</Text>
                  </View>
                </View>
                <Text style={styles.postTime}>9h ago</Text>
              </View>
            </View>
            <Text style={styles.postText}>Celebrated after lunch, snapped with a mint and a 3-min breathing app routine. Any tips that worked?</Text>
            <View style={styles.postImagePlaceholder}>
              <View style={styles.gradientBox} />
            </View>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="arrow-up-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Upvote</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="chatbubble-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="repeat-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Repost</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="heart-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Post 3 */}
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar} />
              <View style={styles.postInfo}>
                <View style={styles.postUserRow}>
                  <Text style={styles.postUsername}>Niha</Text>
                  <View style={styles.postBadge}>
                    <Text style={styles.postBadgeText}>39 days smoke-free</Text>
                  </View>
                </View>
                <Text style={styles.postTime}>12h ago</Text>
              </View>
            </View>
            <Text style={styles.postTitle}>Need help right now!</Text>
            <Text style={styles.postText}>I'm today! Starting a hobbyfriendlier habit tracker that logs the craving. You've got this.</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="arrow-up-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Upvote</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="chatbubble-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="repeat-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Repost</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Ionicons name="heart-outline" size={18} color="#888" />
                <Text style={styles.postActionText}>Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10283B',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#10283B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  shareCard: {
    backgroundColor: '#0E6B8A',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  shareHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A2B34',
    marginRight: 12,
  },
  shareTextContainer: {
    flex: 1,
  },
  shareTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  shareButtonText: {
    fontSize: 12,
    color: '#0E6B8A',
    fontWeight: '600',
  },
  callSquadCard: {
    backgroundColor: '#0E6B8A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  callSquadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  callSquadSubtitle: {
    fontSize: 12,
    color: '#B8E6E3',
    marginBottom: 12,
  },
  viewSquadButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewSquadButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0E6B8A',
  },
  tabsContainer: {
    marginBottom: 24,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0E6B8A',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  trendingCard: {
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  trendingBadge: {
    fontSize: 12,
    color: '#0E6B8A',
    fontWeight: '600',
  },
  trendingTime: {
    fontSize: 12,
    color: '#888',
  },
  trendingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  trendingText: {
    fontSize: 14,
    color: '#888',
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementBadge: {
    fontSize: 12,
    color: '#0E6B8A',
  },
  achievementStats: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementStat: {
    flex: 1,
    backgroundColor: '#1A2B34',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  achievementLabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  achievementValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
  postsSection: {
    marginBottom: 24,
  },
  postCard: {
    backgroundColor: '#1A2B34',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0E6B8A',
    marginRight: 12,
  },
  postInfo: {
    flex: 1,
  },
  postUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  postUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  postBadge: {
    backgroundColor: '#0E6B8A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  postBadgeText: {
    fontSize: 10,
    color: '#fff',
  },
  postTime: {
    fontSize: 12,
    color: '#888',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  postText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImagePlaceholder: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  gradientBox: {
    flex: 1,
    backgroundColor: '#FF6B6B',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A3B44',
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postActionText: {
    fontSize: 12,
    color: '#888',
  },
});