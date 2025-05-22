AOS.init({
    duration: 1000, 
    once: true
  });

  window.addEventListener('load', function() {
  const spinner = document.getElementById('spinner');
  setTimeout(function() {
    spinner.style.display = 'none';
  }, 1000); // 2000 milliseconds = 2 seconds
});