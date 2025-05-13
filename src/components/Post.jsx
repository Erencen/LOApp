import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Post = ({item}) => {
  if (!item || !item.user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {item.user.photo?.sm && (
          <Image source={{uri: item.user.photo.sm}} style={styles.avatar} />
        )}
        <View style={styles.headerText}>
          <Text style={styles.authorName}>
            {item.user.firstName} {item.user.lastName}
          </Text>
          {item.union?.name && (
            <Text style={styles.communityName}>{item.union.name}</Text>
          )}
        </View>
      </View>

      {item.message && <Text style={styles.message}>{item.message}</Text>}

      {item.photos?.[0]?.photo?.md?.src && (
        <Image
          source={{uri: item.photos[0].photo.md.src}}
          style={styles.photo}
          resizeMode="cover"
        />
      )}

      <View style={styles.stats}>
        <Text style={styles.statsText}>Лайков: {item.likes?.count || 0}</Text>
        <Text style={styles.statsText}>
          Комментариев: {item.comments?.count || 0}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    marginLeft: 10,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  communityName: {
    fontSize: 14,
    color: '#65676B',
  },
  message: {
    fontSize: 15,
    marginVertical: 10,
    lineHeight: 20,
  },
  photo: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E4E6EB',
  },
  statsText: {
    color: '#65676B',
    fontSize: 14,
  },
});

export default Post;
