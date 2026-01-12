export function MovieCard({ movie }) {
  // Desestruturação para facilitar a leitura do código
  const {
    title,
    vote_average,
    poster_path,
    release_date,
    overview
  } = movie;

  // Formatação do ano de lançamento
  const releaseYear = release_date ? release_date.split('-')[0] : 'N/A';

  // Formatação da nota (ex: 8.5)
  const rating = vote_average ? vote_average.toFixed(1) : "N/A";

  // URL da imagem com fallback para caso não exista poster
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w400${poster_path}` // Aumentei para w400 para melhor qualidade no hover
    : 'https://placehold.co/400x600?text=Sem+Poster';

  return (
    <article className="movie-card">
      <div className="rating-badge">
        ⭐ {rating}
      </div>

      <div className="card-image-container">
        <img
          src={posterUrl}
          alt={`Poster do filme ${title}`}
          loading="lazy" // Melhora a performance de carregamento
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x600?text=Erro+ao+Carregar';
          }}
        />
      </div>

      <div className="card-content">
        <h3>{title}</h3>
        <p className="release-date">{releaseYear}</p>

        {/* A sinopse no card principal costuma ser opcional em design dark mode
            para manter o grid limpo, mas mantive conforme seu pedido */}
        <div className="overview">
          <p>
            {overview
              ? `${overview.substring(0, 80)}...`
              : 'Sinopse não disponível'}
          </p>
        </div>
      </div>
    </article>
  );
}