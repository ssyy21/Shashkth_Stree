const backToTop = document.getElementById('backToTop');

// Show/hide button when scrolling acc to Y coords
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

// Scroll to top when clicked on button
backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});