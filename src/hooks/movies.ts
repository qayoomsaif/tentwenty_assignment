import {useQuery} from 'react-query';
import {
  getAllGenre,
  getAllMovies,
  getGenre,
  getMovieDetail,
  getMoviesWithQuery,
} from '@services/movies';
export const useGetAllMovies = (payload: Record<string, unknown>) => {
  return useQuery(['movies', payload], () => getAllMovies(payload), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry failed requests twice before giving up
  });
};

export const useGetMovieDetail = (id: number) => {
  return useQuery(['movies', id], () => getMovieDetail(id), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry failed requests twice before giving up
  });
};

export const useGetMoviesWithQuery = (query: string) => {
  console.log({query});

  return useQuery(['search', query], () => getMoviesWithQuery(query), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry failed requests twice before giving up
  });
};

export const useGetAllGenre = () => {
  return useQuery(['genre'], () => getAllGenre(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry failed requests twice before giving up
  });
};

export const useGetGenre = (id: number) => {
  return useQuery(['genre', id], () => getGenre(id), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2, // Retry failed requests twice before giving up
  });
};
