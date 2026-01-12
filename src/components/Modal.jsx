import { useState, useEffect } from "react";

export function Modal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  // Declarando os estados que estavam faltando para evitar erros no console
  const [actors, setActors] = useState([]);
  const [streamingProviders, setStreamingProviders] = useState([]);

  useEffect(() => {
    if (!movie) return;

    setShowVideo(false); // Reseta ao mudar de filme

    const fetchMovieDetails = async () => {
      const apiKey = 'f2f519748d90ef0c4dbb75f95a2eecc9';

      // Usamos append_to_response para pegar tudo (videos, elenco e streaming) em uma chamada só
      const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=pt-BR&append_to_response=videos,credits,watch/providers`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // 1. Definir Elenco (Top 5 atores)
        const cast = data.credits?.cast?.slice(0, 5) || [];
        setActors(cast);

        // 2. Definir Onde Assistir (Brasil)
        const providers = data['watch/providers']?.results?.BR?.flatrate || [];
        setStreamingProviders(providers);

        // 3. Definir Trailer (Tenta PT-BR, se não achar, tenta busca extra em EN-US)
        let trailer = data.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');

        if (!trailer) {
          const resEn = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=en-US`);
          const dataEn = await resEn.json();
          trailer = dataEn.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        }

        setTrailerKey(trailer ? trailer.key : null);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
      }
    };

    fetchMovieDetails();

    // Listener para o botão ESC
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const { title, poster_path, release_date, vote_average, overview } = movie;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>

        <div className="modal-body">
          <div className="modal-media-container">
            {showVideo && trailerKey ? (
              <div className="video-player-container">
                <div className="video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                    title={title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
                <button className="back-to-poster" onClick={() => setShowVideo(false)}>
                  Voltar para o Pôster
                </button>
              </div>
            ) : (
              <div className="poster-wrapper">
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                />
                {trailerKey && (
                  <button className="play-overlay-btn" onClick={() => setShowVideo(true)}>
                    <span className="play-icon">▶</span>
                    Assistir Trailer
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="modal-info">
            <h2>{title}</h2>
            <div className="modal-metadata">
              <span>{release_date?.split('-')[0]}</span>
              <span className="modal-rating">⭐ {vote_average.toFixed(1)}</span>
            </div>

            {/* SEÇÃO DE ATORES */}
            {actors.length > 0 && (
              <div className="actors-section">
                <h3>Elenco Principal</h3>
                <div className="actors-list">
                  {actors.map(actor => (
                    <span key={actor.id} className="actor-tag">{actor.name}</span>
                  ))}
                </div>
              </div>
            )}

            {/* SEÇÃO DE STREAMING */}
            <div className="streaming-section">
              <h3>Onde Assistir</h3>
              <div className="streaming-list">
                {streamingProviders.length > 0 ? (
                  streamingProviders.map(provider => (
                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      className="streaming-logo"
                    />
                  ))
                ) : (
                  <p className="no-streaming">Não disponível em streaming no momento.</p>
                )}
              </div>
            </div>

            <h3>Sinopse</h3>
            <p className="full-overview">{overview || "Sinopse indisponível."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}