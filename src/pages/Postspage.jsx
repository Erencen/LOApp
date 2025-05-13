import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {getFeedPosts} from '../services/api';
import Post from '../components/Post';
import Pagination from '../components/Pagination';

const POSTS_PER_PAGE = 5;

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const loadPosts = async (page = 1, isRefreshing = false) => {
    try {
      if (!isRefreshing) {
        setLoading(true);
      }
      const response = await getFeedPosts(page, POSTS_PER_PAGE);

      setPosts(response.items);
      setHasMore(response.hasMore);
      setTotal(response.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts(1, true);
  };

  return (
    <View style={styles.container}>
      {loading && !refreshing && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <FlashList
        data={posts}
        renderItem={({item}) => <Post item={item} />}
        estimatedItemSize={300}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <Pagination
        currentPage={currentPage}
        hasMore={hasMore}
        loading={loading}
        total={total}
        onNextPage={() => !loading && hasMore && loadPosts(currentPage + 1)}
        onPrevPage={() =>
          !loading && currentPage > 1 && loadPosts(currentPage - 1)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default PostsScreen;
