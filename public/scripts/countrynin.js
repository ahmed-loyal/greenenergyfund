function updateInputType() {
    var countrySelect = document.querySelector('input[name="country"]:checked');
    var nationalIdInput = document.getElementById('idnumber');


    // Show input container if a country is selected
    if (countrySelect.value) {

      // Set placeholder and input type based on selected country
      switch (countrySelect.value) {
        case 'US':
          nationalIdInput.placeholder = 'Enter SSN (e.g., 123-45-6789)';
          nationalIdInput.pattern = '\\d{3}-\\d{2}-\\d{4}'; // Validate SSN format
          break;
        case 'CA':
          nationalIdInput.placeholder = 'Enter SIN (e.g., 123-456-789)';
          nationalIdInput.pattern = '\\d{3}-\\d{3}-\\d{3}'; // Validate SIN format
          break;
        case 'AU':
          nationalIdInput.placeholder = 'Enter TFN (e.g., 123 456 789)';
          nationalIdInput.pattern = '\\d{3} \\d{3} \\d{3}'; // Validate TFN format
          break;
        case 'GB':
          nationalIdInput.placeholder = 'Enter NI Number (e.g., AB123456C)';
          nationalIdInput.pattern = '[A-Z]{2}\\d{6}[A-Z]{1}'; // Validate NI Number format
          break;
        default:
          nationalIdInput.placeholder = 'Enter Country ID Number';
          nationalIdInput.pattern = ''; // Clear any specific pattern
      }
    } else {
      console.log(err);
    }
  }