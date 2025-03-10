import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '@constants/index';
import {backArrow, PLAY} from '@assets/svg';
import {
  NativeStackScreenProps,
  RootStackParamList,
  SCREENS,
} from '@navigation/index';
import {Button, Text} from '@components/index';
import {useGetMovieDetail} from '@hooks/movies';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import {height} from '@utils/resizeUtils';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

const MovieDetail: React.FC<ScreenProps> = ({route, navigation}) => {
  const movieId = route.params?.id ?? 0;
  const {data, isLoading} = useGetMovieDetail(movieId);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      style={styles.container}>
      {/* Movie Header Image */}
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/original${data?.backdrop_path}`,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.headerImage}>
        {/* Overlay Content */}
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <SvgXml xml={backArrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Watch</Text>
        </View>
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{data?.original_title}</Text>
          <Text style={styles.releaseDate}>
            In theaters {moment(data?.release_date).format('MMMM D, YYYY')}
          </Text>
          <Button
            style={styles.button}
            title="Get Tickets"
            onPress={() =>
              navigation.navigate(SCREENS.MovieTickets, {id: movieId})
            }
          />
          <Button
            style={[styles.button, styles.outlinedButton]}
            title="Watch Trailer"
            onPress={() => console.log('TODO: Implement Watch Trailer')}
            leftIcon={PLAY}
          />
        </View>
      </FastImage>

      {/* Movie Info */}

      {/* Movie Details */}
      <View style={styles.content}>
        {/* Genres */}
        <Text style={styles.sectionTitle}>Genre</Text>
        <View style={styles.genreContainer}>
          {data?.genres?.map((genre, index) => (
            <View
              key={genre.id}
              style={[
                styles.genreBadge,
                {backgroundColor: genreColors[index % genreColors.length]},
              ]}>
              <Text style={styles.genreText}>{genre.name}</Text>
            </View>
          ))}
        </View>

        {/* Overview */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overview}>
          {data?.overview || 'No overview available.'}
        </Text>
      </View>
    </ScrollView>
  );
};

// Genre Colors Array
const genreColors = [
  Colors.greenAccent,
  Colors.pinkAccent,
  Colors.purpleAccent,
  Colors.blueAccent,
  Colors.yellow,
  Colors.primary,
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 400,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: height * 0.5,
    backgroundColor: Colors.cardBackground,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    minHeight: '50%',
  },
  overlay: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 40 : 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textWhite,
    marginLeft: 10,
  },
  movieInfo: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textWhite,
    textAlign: 'center',
  },
  releaseDate: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textWhite,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    width: '80%',
    backgroundColor: Colors.blueInfo,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#6EC1E4',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 16,
    color: Colors.textWhite,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: Colors.textDefault,
    marginTop: 20,
  },
  genreContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  genreBadge: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: Colors.textWhite,
  },
  overview: {
    fontSize: 12,
    color: Colors.textDark,
    marginTop: 10,
  },
});

export default MovieDetail;
