const body = document.body;
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.toggle-icon');
const themeLabel = themeToggle.querySelector('.toggle-text');
const shelfBooks = Array.from(document.querySelectorAll('.shelf-book'));
const resultsCount = document.getElementById('resultsCount');

const storedTheme = localStorage.getItem('chemTheme');
if (storedTheme === 'dark') {
  body.classList.add('dark');
}

function updateThemeButton() {
  const isDark = body.classList.contains('dark');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
}

function filterChapters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  shelfBooks.forEach((book) => {
    const title = book.dataset.title.toLowerCase();
    const match = title.includes(query);
    book.classList.toggle('hidden-card', !match);
    if (match) visibleCount += 1;
  });

  resultsCount.textContent = `${visibleCount} chapter${visibleCount === 1 ? '' : 's'}`;
}

searchInput.addEventListener('input', filterChapters);

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('chemTheme', isDark ? 'dark' : 'light');
  updateThemeButton();
});

updateThemeButton();
filterChapters();
