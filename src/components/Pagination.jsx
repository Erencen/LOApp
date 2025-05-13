import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Pagination = ({
  currentPage,
  hasMore,
  loading,
  total,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.pageButton,
          (currentPage === 1 || loading) && styles.pageButtonDisabled,
        ]}
        onPress={onPrevPage}
        disabled={currentPage === 1 || loading}>
        <Text style={styles.pageButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.pageInfo}>
        <Text style={styles.pageText}>{currentPage}</Text>
        <Text style={styles.totalText}>Всего: {total}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.pageButton,
          (!hasMore || loading) && styles.pageButtonDisabled,
        ]}
        onPress={onNextPage}
        disabled={!hasMore || loading}>
        <Text style={styles.pageButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E4E6EB',
  },
  pageButton: {
    backgroundColor: '#1877f2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  pageButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pageInfo: {
    alignItems: 'center',
  },
  pageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1877f2',
  },
  totalText: {
    fontSize: 12,
    color: '#65676B',
    marginTop: 2,
  },
});

export default Pagination;
