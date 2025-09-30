document.addEventListener('DOMContentLoaded', () => {
  const bookingSection = document.getElementById('booking-section');
  const selectedPackageName = document.getElementById('selected-package-name');
  const bookingForm = document.getElementById('booking-form');

  document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', () => {
      const packageName = button.getAttribute('data-package');
      selectedPackageName.textContent = packageName;
      bookingSection.classList.remove('hidden');
      bookingForm.scrollIntoView({behavior: 'smooth'});
    });
  });

  bookingForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear errors
    ['nameError', 'phoneError', 'participantsError', 'departDateError', 'returnDateError'].forEach(id => {
      const el = document.getElementById(id);
      if(el) el.textContent = '';
    });

    let valid = true;

    // Validation: Full Name (not empty, min 3 chars)
    const name = bookingForm.fullname.value.trim();
    if (name.length < 3) {
      document.getElementById('nameError').textContent = 'Please enter your full name (min 3 characters).';
      valid = false;
    }

    // Validation: Phone Number (only digits, min 10 chars)
    const phone = bookingForm.phone.value.trim();
    if (phone.length < 10 || [...phone].some(c => isNaN(parseInt(c)))) {
      document.getElementById('phoneError').textContent = 'Please enter a valid phone number with at least 10 digits.';
      valid = false;
    }

    // Validation: Total Participants (min 1)
    const participants = parseInt(bookingForm.participants.value);
    if (isNaN(participants) || participants < 1) {
      document.getElementById('participantsError').textContent = 'Total participants must be at least 1.';
      valid = false;
    }

    // Validation: Departure Date (today or future)
    const departDateValue = bookingForm.departDate.value;
    const departDate = new Date(departDateValue);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (!departDateValue || departDate < today) {
      document.getElementById('departDateError').textContent = 'Departure date must be today or later.';
      valid = false;
    }

    // Validation: Return Date (after departure)
    const returnDateValue = bookingForm.returnDate.value;
    const returnDate = new Date(returnDateValue);
    if (!returnDateValue || returnDate <= departDate) {
      document.getElementById('returnDateError').textContent = 'Return date must be after departure date.';
      valid = false;
    }

    if (valid) {
      alert(`Booking for "${selectedPackageName.textContent}" submitted successfully!`);
      bookingForm.reset();
      bookingSection.classList.add('hidden');
    }
  });
});
