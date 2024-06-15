document.addEventListener('DOMContentLoaded', function() {
  // Get all modal buttons
  const modalBtns = document.querySelectorAll(".modalBtn");

  // Get all close buttons within modals
  const closeBtns = document.querySelectorAll(".modal .close, .modal .close-btn");

  // Loop through each modal button and attach click event
  modalBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const modalId = this.getAttribute('data-target'); // Get target modal ID
          const modal = document.querySelector(modalId); // Find the modal by ID
          modal.style.display = "block"; // Display the modal
      });
  });

  // Loop through each close button and attach click event
  closeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          const modal = this.closest('.modal'); // Find the closest modal
          modal.style.display = "none"; // Hide the modal
      });
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
          event.target.style.display = 'none';
      }
  });
});
