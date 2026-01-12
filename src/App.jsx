import { useState, useEffect } from "react";
import './App.css';
import { MovieCard } from "./components/MovieCard";
import { Modal } from "./components/Modal";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [currentUrl, setCurrentUrl] = useState('');

  const apiKey = 'f2f519748d90ef0c4dbb75f95a2eecc9';

  // Carrega filmes populares ao abrir e define a URL inicial
  useEffect(() => {
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
    setCurrentUrl(popularUrl); // Salva para permitir paginação logo de cara
    fetchMoviesByUrl(popularUrl, 1, false);
  }, []);

  const fetchMoviesByUrl = async (url, pageNumber = 1, isLoadMore = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}&page=${pageNumber}`);
      const data = await response.json();
      // Concatena se for "Carregar Mais", substitui se for busca nova
      setMovies(prev => isLoadMore ? [...prev, ...data.results] : data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    // A busca por 'search/movie' já tenta trazer os mais relevantes.
    // Não há um parâmetro "sort_by" oficial para a rota de busca por texto,
    // mas podemos garantir que a URL salve o estado para paginação.
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&language=pt-BR&include_adult=false`;
    setPage(1);
    setCurrentUrl(url);
    fetchMoviesByUrl(url, 1, false);
  };

  const handleFilter = (genreId) => {
    setSearchTerm('');
    const url = genreId
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=pt-BR`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`;
    setPage(1);
    setCurrentUrl(url);
    fetchMoviesByUrl(url, 1, false);
  };

  // Função disparada pelo botão "Carregar Mais"
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMoviesByUrl(currentUrl, nextPage, true); // Usa a última URL salva
  };

  const handleYearFilter = (year) => {
    setSearchTerm(''); // Limpa a busca por texto
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${year}&language=pt-BR`;

    setPage(1);
    setCurrentUrl(url); // Importante para o "Carregar Mais" funcionar com o ano
    fetchMoviesByUrl(url, 1, false);
  };

  // Filtro por Avaliação
  const handleRatingFilter = (minRating) => {
    setSearchTerm('');
    // Filtra por nota mínima e garante um número relevante de votos para qualidade
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&vote_average.gte=${minRating}&vote_count.gte=500&language=pt-BR&sort_by=vote_average.desc`;
    setPage(1);
    setCurrentUrl(url);
    fetchMoviesByUrl(url, 1, false);
  };

  return (
    <div className="App">
      <h1>Meu Catálogo de Filmes</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Busque um filme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={(e) => e.target.select()}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="filter-container">
        <div className="filter-wrapper">

          {/* Grupo de Categorias */}
          <div className="filter-group">
            <span className="filter-label">Gêneros</span>
            <div className="filter-buttons">
              <button onClick={() => handleFilter(null)}>🔥 Populares</button>
              <button onClick={() => handleFilter(28)}>Ação</button>
              <button onClick={() => handleFilter(35)}>Comédia</button>
              <button onClick={() => handleFilter(27)}>Terror</button>
              <button onClick={() => handleFilter(10749)}>Romance</button>
              <button onClick={() => handleFilter(16)}>Animação</button>
            </div>
          </div>

          {/* Grupo de Datas */}
          <div className="filter-group">
            <span className="filter-label">Lançamentos</span>
            <div className="filter-buttons">
              <button onClick={() => handleYearFilter(2026)}>📅 2026</button>
              <button onClick={() => handleYearFilter(2025)}>📅 2025</button>
              <button onClick={() => handleYearFilter(2024)}>📅 2024</button>
              <button onClick={() => handleYearFilter(2023)}>📅 2023</button>
              <button onClick={() => handleYearFilter(2022)}>📅 2022</button>
              <button onClick={() => handleYearFilter(2021)}>📅 2021</button>
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Avaliação</span>
            <div className="filter-buttons">
              <button onClick={() => handleRatingFilter(8.5)}>🏆 +8.5</button>
              <button onClick={() => handleRatingFilter(8)}>🌟 +8.0</button>
              <button onClick={() => handleRatingFilter(7)}>⭐ +7.0</button>
            </div>
          </div>

        </div>
      </div>

      <div className="movies-list">
        {movies.map((movie) => (
          <div key={`${movie.id}-${Math.random()}`} onClick={() => setSelectedMovie(movie)}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="loading">
          <p>Carregando filmes...🍿</p>
        </div>
      )}

      {/* O BOTÃO AGORA APARECE SE HOUVER FILMES E NÃO ESTIVER CARREGANDO */}
      {!isLoading && movies.length > 0 && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Carregar Mais
        </button>
      )}

      <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />

      {!isLoading && movies.length === 0 && searchTerm !== '' && (
        <div className="no-results">
          <p>Nenhum filme encontrado para "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
}

export default App;