import {client} from './client';
import {ENDPOINTS} from './EndPoints';
import {
  IGenreResponse,
  IMovieDetailResponse,
  IMovieResponse,
} from '@schemas/movies';

const apiClient = client();

export const getAllMovies = async (
  payload: Record<string, unknown>,
): Promise<IMovieResponse> =>
  await apiClient.get(ENDPOINTS.movies, {
    params: {
      page: payload?.page ?? 1,
    },
  });

export const getMovieDetail = async (
  id: number,
): Promise<IMovieDetailResponse> =>
  await apiClient.get(`${ENDPOINTS.moviesDetail}/${id}`);

export const getMoviesWithQuery = async (
  query: string,
): Promise<IMovieResponse> =>
  await apiClient.get(ENDPOINTS.moviesSearch, {
    params: {
      query: query,
    },
  });

export const getAllGenre = async (): Promise<IGenreResponse> =>
  await apiClient.get(ENDPOINTS.genre);

export const getGenre = async (id: number): Promise<IMovieResponse> =>
  await apiClient.get(ENDPOINTS.genreById, {
    params: {
      with_genres: id,
    },
  });
