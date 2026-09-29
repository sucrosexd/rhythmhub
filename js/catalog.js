const gamesData = [
  {
    id: 1,
    title: 'Beat Saber',
    genre: 'rock',
    emoji: '🎸',
    description: 'Ритм-игра с использованием VR',
    rating: '★★★★★'
  },
  {
    id: 2,
    title: 'Osu!',
    genre: 'pop',
    emoji: '⭕',
    description: 'Классическая ритм-игра с кругами',
    rating: '★★★★☆'
  },
  {
    id: 3,
    title: 'Crypt of the NecroDancer',
    genre: 'electronic',
    emoji: '🎵',
    description: 'Подземелье в ритме музыки',
    rating: '★★★★★'
  },
  {
    id: 4,
    title: 'Taiko no Tatsujin',
    genre: 'anime',
    emoji: '🥁',
    description: 'Японская игра с барабанами',
    rating: '★★★★☆'
  },
  {
    id: 5,
    title: 'Guitar Hero',
    genre: 'rock',
    emoji: '🎸',
    description: 'Легендарная гитарная ритм-игра',
    rating: '★★★★★'
  },
  {
    id: 6,
    title: 'Cytus',
    genre: 'electronic',
    emoji: '💫',
    description: 'Электронная ритм-игра с красивой графикой',
    rating: '★★★★☆'
  },
  {
    id: 7,
    title: 'Muse Dash',
    genre: 'anime',
    emoji: '🎮',
    description: 'Аниме ритм-платформер',
    rating: '★★★★☆'
  },
  {
    id: 8,
    title: 'StepMania',
    genre: 'pop',
    emoji: '👟',
    description: 'Симулятор танцевальной машины',
    rating: '★★★★☆'
  }
];

document.addEventListener('DOMContentLoaded', function () {
  renderGames(gamesData);
  setupFilters();
});

function renderGames(games) {
  const gamesGrid = document.getElementById('gamesGrid');

  if (!gamesGrid) return;

  gamesGrid.innerHTML = '';

  if (games.length === 0) {
    gamesGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #6b7280;">Игры не найдены</p>';
    return;
  }

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.innerHTML = `
            <div class="game-image">${game.emoji}</div>
            <div class="game-content">
                <h3 class="game-title">${game.title}</h3>
                <span class="game-genre">${game.genre}</span>
                <p class="game-description">${game.description}</p>
                <div class="game-rating">${game.rating}</div>
            </div>
        `;
    gamesGrid.appendChild(gameCard);
  });
}

function setupFilters() {
  const searchInput = document.getElementById('searchInput');
  const genreFilter = document.getElementById('genreFilter');

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  if (genreFilter) {
    genreFilter.addEventListener('change', applyFilters);
  }
}

function applyFilters() {
  const searchInput = document.getElementById('searchInput');
  const genreFilter = document.getElementById('genreFilter');

  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedGenre = genreFilter ? genreFilter.value : '';

  let filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm);
    const matchesGenre = selectedGenre === '' || game.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  renderGames(filteredGames);
}

function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);

  themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
  });
}

function updateThemeButton(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }
}

setupThemeToggle();
