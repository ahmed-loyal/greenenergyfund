const inputs = document.querySelectorAll('input');
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

const patterns = {
  telephone: /^\d{11}$/,
  slug: /^[a-z0-9-]+$/,
  username: /^[a-z]{5,12}$/i,
  email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,12})$/,
  password: /^[a-z0-9_-]{8,20}$/
};

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Check if a country is selected
    const countrySelected = document.querySelector('input[name="country"]:checked');
    // if (!countrySelected) {
    //   console.error("No country selected.");
    //   alert("Please select a country.");
    //   return;
    // }

    // Validate all inputs in the current form step
    const currentStepInputs = formSteps[formStepsNum].querySelectorAll('input');
    let allValid = true;

    currentStepInputs.forEach(input => {
      const pattern = patterns[input.name];
      if (pattern && !pattern.test(input.value)) {
        allValid = false;
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
      }
    });

    // If all inputs are valid, proceed to the next step
    if (allValid) {
      formStepsNum++;
      updateFormSteps();
      updateProgressbar();
    } else {
      console.error("Some inputs are invalid.");
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  });
});

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.name]);
  });
});

function validate(field, regex) {
  if (regex.test(field.value)) {
    field.className = 'valid';
  } else {
    field.className = 'invalid';
  }
}

function updateFormSteps() {
  formSteps.forEach((formStep, index) => {
    if (index === formStepsNum) {
      formStep.classList.add("form-step-active");
    } else {
      formStep.classList.remove("form-step-active");
    }
  });
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

// Function to update input type based on selected country
function updateInputType() {
  var countrySelect = document.querySelector('input[name="country"]:checked');
  var nationalIdInput = document.getElementById('ninnumber');

  // Show input container if a country is selected
  if (countrySelect && countrySelect.value) {
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
    console.error("No country selected.");
  }
}

// Add event listener to update the input type when country is selected
document.querySelectorAll('input[name="country"]').forEach((input) => {
  input.addEventListener('change', updateInputType);
});

// Call updateInputType initially in case a country is already selected
updateInputType();






// const prevBtns = document.querySelectorAll(".btn-prev");
// const nextBtns = document.querySelectorAll(".btn-next");
// const progress = document.getElementById("progress");
// const formSteps = document.querySelectorAll(".form-step");
// const progressSteps = document.querySelectorAll(".progress-step");

// const patterns = {
//   firstname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/,
//   lastname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/,
//   businessname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/,
//   businesslegalname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/,
//   phonenumber: /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
//   state: /^[A-Za-z]{2,}$/,
//   city: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,100}$/,
//   homeaddress: /^[\dA-Za-zÀ-ÖØ-öø-ÿ'.,\-/\s]{1,200}$/,
//   businessaddress: /^[\dA-Za-zÀ-ÖØ-öø-ÿ'.,\-/\s]{1,200}$/,
//   zipcode: /^\d{5}(-\d{4})?$/,
//   dob: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/,
//   loanamount: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
//   requestamount: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
//   website: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=]*)?$/,
//   annualrevenue: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
//   businessstartdate: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/
// };

// let formStepsNum = 0;

// nextBtns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();

//      // Validate all inputs and selects in the current form step
//     const currentStepElements = formSteps[formStepsNum].querySelectorAll('input, select');
//     let allValid = true;

//     currentStepElements.forEach(element => {
//       if (element.tagName.toLowerCase() === 'input') {
//         const pattern = patterns[element.name];
//         if (pattern && !pattern.test(element.value)) {
//           allValid = false;
//           element.classList.add('invalid');
//         } else {
//           element.classList.remove('invalid');
//           element.classList.add('valid');
//         }
//       } else if (element.tagName.toLowerCase() === 'select') {
//         if (element.value === "") {
//           allValid = false;
//           element.classList.add('invalid');
//         } else {
//           element.classList.remove('invalid');
//           element.classList.add('valid');
//         }
//       }
//     });

//     // If all inputs and selects are valid, proceed to the next step
//     if (allValid) {
//       formStepsNum++;
//       updateFormSteps();
//       updateProgressbar();
//     } else {
//       console.error("Some inputs or selects are invalid.");
//     }
//   });
 
// });

// prevBtns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     formStepsNum--;
//     updateFormSteps();
//     updateProgressbar();
//   });
// });

// function updateFormSteps() {
//   formSteps.forEach((formStep, index) => {
//     if (index === formStepsNum) {
//       formStep.classList.add("form-step-active");
//     } else {
//       formStep.classList.remove("form-step-active");
//     }
//   });
// }

// function updateProgressbar() {
//   progressSteps.forEach((progressStep, idx) => {
//     if (idx < formStepsNum + 1) {
//       progressStep.classList.add("progress-step-active");
//     } else {
//       progressStep.classList.remove("progress-step-active");
//     }
//   });

//   const progressActive = document.querySelectorAll(".progress-step-active");

//   progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
// }

// // Function to update input type based on selected country
// function updateInputType() {
//   var countrySelect = document.querySelector('input[name="country"]:checked');
//   var nationalIdInput = document.getElementById('ninnumber');

//   // Show input container if a country is selected
//   if (countrySelect && countrySelect.value) {
//     // Set placeholder and input type based on selected country
//     switch (countrySelect.value) {
//       case 'US':
//         nationalIdInput.placeholder = 'Enter SSN (e.g., 123-45-6789)';
//         nationalIdInput.pattern = '\\d{3}-\\d{2}-\\d{4}'; // Validate SSN format
//         break;
//       case 'CA':
//         nationalIdInput.placeholder = 'Enter SIN (e.g., 123-456-789)';
//         nationalIdInput.pattern = '\\d{3}-\\d{3}-\\d{3}'; // Validate SIN format
//         break;
//       case 'AU':
//         nationalIdInput.placeholder = 'Enter TFN (e.g., 123 456 789)';
//         nationalIdInput.pattern = '\\d{3} \\d{3} \\d{3}'; // Validate TFN format
//         break;
//       case 'GB':
//         nationalIdInput.placeholder = 'Enter NI Number (e.g., AB123456C)';
//         nationalIdInput.pattern = '[A-Z]{2}\\d{6}[A-Z]{1}'; // Validate NI Number format
//         break;
//       default:
//         nationalIdInput.placeholder = 'Enter Country ID Number';
//         nationalIdInput.pattern = ''; // Clear any specific pattern
//     }
//   } else {
//     console.error("No country selected.");
//   }
// }

// // Add event listener to update the input type when country is selected
// document.querySelectorAll('input[name="country"]').forEach((input) => {
//   input.addEventListener('change', updateInputType);
// });

// // Call updateInputType initially in case a country is already selected
// updateInputType();





// // const Form = document.getElementById('form-step');
// // const inputs = document.querySelectorAll('input');
// const prevBtns = document.querySelectorAll(".btn-prev");
// const nextBtns = document.querySelectorAll(".btn-next");
// const progress = document.getElementById("progress");
// const formSteps = document.querySelectorAll(".form-step");
// const progressSteps = document.querySelectorAll(".progress-step");

// const patterns ={
//   firstname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/i,
//   lastname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/i,
//   businessname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/i,
//   businesslegalname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/i,
//   phonenumber: /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
//   state: /^[A-Za-z]{2,}$/i,
//   city: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,100}$/i,
//   homeaddress: /^[\dA-Za-zÀ-ÖØ-öø-ÿ'.,\-/\s]{1,200}$/i,
//   businessaddress: /^[\dA-Za-zÀ-ÖØ-öø-ÿ'.,\-/\s]{1,200}$/i,
//   zipcode: /^\d{5}(-\d{4})?$/,
//   dob: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/,
//   loanamount: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
//   requestamount: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
//   website: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=]*)?$/i,
//   annualrevenue: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
//   businessstartdate: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/,
// };


// let formStepsNum = 0;

// nextBtns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();

//     // Check if a country is selected
//     // const countrySelected = document.querySelector('input[name="country"]:checked');
//     // if (!countrySelected) {
//     //   console.error("No country selected.");
//     //   alert("Please select a country.");
//     //   return;
//     // }

//     // Validate all inputs and selects in the current form step
//     const currentStepElements = formSteps[formStepsNum].querySelectorAll('input, select');
//     let allValid = true;

//     currentStepElements.forEach(element => {
//       if (element.tagName.toLowerCase() === 'input') {
//         const pattern = patterns[element.name];
//         if (pattern && !pattern.test(element.value)) {
//           allValid = false;
//           element.classList.add('invalid');
//         } else {
//           element.classList.remove('invalid');
//           element.classList.add('valid');
//         }
//       } else if (element.tagName.toLowerCase() === 'select') {
//         if (element.value === "") {
//           allValid = false;
//           element.classList.add('invalid');
//         } else {
//           element.classList.remove('invalid');
//           element.classList.add('valid');
//         }
//       }
//     });

//     // If all inputs and selects are valid, proceed to the next step
//     if (allValid) {
//       formStepsNum++;
//       updateFormSteps();
//       updateProgressbar();
//     } else {
//       console.error("Some inputs or selects are invalid.");
//     }
//   });
// });

// prevBtns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     formStepsNum--;
//     updateFormSteps();
//     updateProgressbar();
//   });
// });


// // inputs.forEach((input) => {
// //   input.addEventListener('keyup', (e) => {
// //     validate(e.target, patterns[e.target.name]);
// //   });
// // });

// // selects.forEach((select) => {
// //   select.addEventListener('change', (e) => {
// //     validateSelect(e.target);
// //   });
// // });

// // function validate(field, regex) {
// //   if (regex.test(field.value)) {
// //     field.className = 'valid';
// //   } else {
// //     field.className = 'invalid';
// //   }
// // }

// // function validateSelect(select) {
// //   if (select.value === "") {
// //     select.classList.add('invalid');
// //   } else {
// //     select.classList.remove('invalid');
// //     select.classList.add('valid');
// //   }
// // }


// function updateFormSteps() {
//     formSteps.forEach((formStep) => {
//       formStep.classList.contains("form-step-active") &&
//         formStep.classList.remove("form-step-active");
//     });
  
//     formSteps[formStepsNum].classList.add("form-step-active");
// }

// function updateProgressbar() {
//     progressSteps.forEach((progressStep, idx) => {
//       if (idx < formStepsNum + 1) {
//         progressStep.classList.add("progress-step-active");
//       } else {
//         progressStep.classList.remove("progress-step-active");
//       }
//     });
  
//     const progressActive = document.querySelectorAll(".progress-step-active");
  
//     progress.style.width =
//       ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
// }


// // Function to update input type based on selected country
// function updateInputType() {
//   var countrySelect = document.querySelector('input[name="country"]:checked');
//   var nationalIdInput = document.getElementById('ninnumber');

//   // Show input container if a country is selected
//   if (countrySelect && countrySelect.value) {
//     // Set placeholder and input type based on selected country
//     switch (countrySelect.value) {
//       case 'US':
//         nationalIdInput.placeholder = 'Enter SSN (e.g., 123-45-6789)';
//         nationalIdInput.pattern = '\\d{3}-\\d{2}-\\d{4}'; // Validate SSN format
//         break;
//       case 'CA':
//         nationalIdInput.placeholder = 'Enter SIN (e.g., 123-456-789)';
//         nationalIdInput.pattern = '\\d{3}-\\d{3}-\\d{3}'; // Validate SIN format
//         break;
//       case 'AU':
//         nationalIdInput.placeholder = 'Enter TFN (e.g., 123 456 789)';
//         nationalIdInput.pattern = '\\d{3} \\d{3} \\d{3}'; // Validate TFN format
//         break;
//       case 'GB':
//         nationalIdInput.placeholder = 'Enter NI Number (e.g., AB123456C)';
//         nationalIdInput.pattern = '[A-Z]{2}\\d{6}[A-Z]{1}'; // Validate NI Number format
//         break;
//       default:
//         nationalIdInput.placeholder = 'Enter Country ID Number';
//         nationalIdInput.pattern = ''; // Clear any specific pattern
//     }
//   } else {
//     console.error("No country selected.");
//   }
// }

// // Add event listener to update the input type when country is selected
// document.querySelectorAll('input[name="country"]').forEach((input) => {
//   input.addEventListener('change', updateInputType);
// });

// // Call updateInputType initially in case a country is already selected
// updateInputType();