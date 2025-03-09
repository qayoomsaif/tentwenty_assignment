import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from '@components/index';
import {Colors} from '@constants/Colors';
import {useGetAllGenre} from '@hooks/movies';
import {IGenre} from '@schemas/movies';

interface MovieCategoriesProps {
  onPress: (res: string) => void;
}

const MovieCategories: React.FC<MovieCategoriesProps> = ({onPress}) => {
  const {data, isLoading, isFetching} = useGetAllGenre();

  const renderItem = ({item}: {item: IGenre}) => (
    <TouchableOpacity
      onPress={() => onPress(item.name)}
      style={styles.card}
      activeOpacity={0.7}>
      <FastImage
        source={{
          uri:
            item?.imageUrl ||
            'https://via.placeholder.com/300x200?text=No+Image',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (isLoading || isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={data?.genres ?? []}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    padding: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    aspectRatio: 1.7,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackgroundDark
    // backgroundColor: Colors.cardBackgroundDark
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textWhite,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieCategories;
