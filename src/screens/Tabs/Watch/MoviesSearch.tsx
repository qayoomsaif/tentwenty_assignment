import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useGetAllGenre, useGetMoviesWithQuery} from '@hooks/movies';
import {IMovie} from '@schemas/movies';
import {SvgXml} from 'react-native-svg';
import {MORE} from '@assets/svg';
import {Colors} from '@constants/Colors';
import {Text} from '@components/index';

interface MoviesSearchProps {
  text: string;
  onPress: (id: number) => void;
}

const MoviesSearch: React.FC<MoviesSearchProps> = ({text, onPress}) => {
  const {data, isLoading, isFetching} = useGetMoviesWithQuery(text);
  const {data: dataGenre} = useGetAllGenre();

  const renderItem = ({item}: {item: IMovie}) => {
    const genreNames = item.genre_ids
      .map(
        genreId => dataGenre?.genres.find(genre => genre.id === genreId)?.name,
      )
      .filter(Boolean)
      .join(', ');

    return (
      <TouchableOpacity onPress={() => onPress(item.id)} style={styles.card}>
        <FastImage
          source={{
            uri: `https://image.tmdb.org/t/p/w300/${item?.poster_path}`,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text numberOfLines={2} style={styles.category}>
            {genreNames || ''}
          </Text>
        </View>
        <TouchableOpacity>
          <SvgXml xml={MORE} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Top Results {data?.results?.length || 0}
        </Text>
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        data={data?.results ?? []}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          isLoading || isFetching ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : data?.results?.length === 0 ? (
            <Text style={styles.notFound}>No movies found</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: Colors.borderGreyLight,
  },
  headerTitle: {
    fontSize: 12,
    color: Colors.textDefault,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 100,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    color: Colors.textDefault,
    lineHeight: 25,
  },
  category: {
    fontSize: 14,
    color: Colors.textLight,
  },
  notFound: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textLight,
    marginVertical: 20,
  },
});

export default MoviesSearch;
