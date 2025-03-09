import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '@constants/index';
import {
  NativeStackScreenProps,
  RootStackParamList,
  SCREENS,
} from '@navigation/index';
import {useGetAllMovies} from '@hooks/movies';
import {IMovie} from '@schemas/movies';
import {SvgXml} from 'react-native-svg';
import {SEARCH} from '@assets/svg';
import SearchBar from '@components/SearchBar';
import {Text} from '@components/index';
import MovieCategoriesScreen from './MovieCategories';
import MoviesSearch from './MoviesSearch';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'Watch'>;

const Watch: React.FC<ScreenProps> = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<IMovie[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {data, isLoading, isFetching} = useGetAllMovies({page});

  // Load more movies on scroll
  const loadMoreMovies = useCallback(() => {
    if (isFetchingMore || isFetching) return;
    setIsFetchingMore(true);
    setPage(prev => prev + 1);
  }, [isFetchingMore, isFetching]);

  // Update movie list when new data is fetched
  useEffect(() => {
    if (data?.results?.length) {
      setAllData(prevData => [...prevData, ...data.results]);
    }
    setIsFetchingMore(false);
  }, [data]);

  // Filter movies based on search text
  const filteredMovies = searchText
    ? allData.filter(movie =>
        movie.title.toLowerCase().includes(searchText.toLowerCase()),
      )
    : allData;

  // Render movie item
  const renderItem = ({item}: {item: IMovie}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(SCREENS.MovieDetail, {id: item.id})}
      style={styles.card}
      activeOpacity={0.8}>
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/w300/${item?.poster_path}`,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {isSearching ? (
            <SearchBar
              onClear={() => {
                setSearchText('');
                setIsSearching(false);
              }}
              placeholder="TV shows, movies & more"
              value={searchText}
              autoFocus
              onChangeText={setSearchText}
            />
          ) : (
            <View style={styles.headerContent}>
              <Text style={styles.header}>Watch</Text>
              <TouchableOpacity
                onPress={() => setIsSearching(true)}
                style={styles.iconContainer}>
                <SvgXml xml={SEARCH} width={18} height={18} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!isSearching ? (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item, index) => `${item.id}_${index}`}
            renderItem={renderItem}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.list}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.5}
            initialNumToRender={10} // Optimized for performance
            removeClippedSubviews={true} // Helps with memory optimization
            ListFooterComponent={
              isFetchingMore ? (
                <ActivityIndicator
                  size="large"
                  color={Colors.primary}
                  style={styles.loader}
                />
              ) : null
            }
          />
        ) : !searchText ? (
          <MovieCategoriesScreen onPress={setSearchText} />
        ) : (
          <MoviesSearch
            text={searchText}
            onPress={id => navigation.navigate(SCREENS.MovieDetail, {id})}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    height: 52,
  },
  header: {
    fontSize: 16,
    color: Colors.textDefault,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: Colors.cardBackground,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 18,
    color: Colors.textWhite,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
  loader: {
    marginVertical: 10,
  },
});

export default Watch;
