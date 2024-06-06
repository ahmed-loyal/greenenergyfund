const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");

const patterns = {
  firstname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/,
  lastname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/,
  phonenumber: /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  homeaddress: /^[\dA-Za-zÀ-ÖØ-öø-ÿ'.,\-/\s]{1,200}$/,
  state: /^[A-Za-z]{2,}$/,
  city: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,100}$/,
  zipcode: /^\d{5}(-\d{4})?$/,
  ninnumber: /^(?=(?:.*\d){2,})[A-Za-z0-9\s-]*$/,
  dob: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/,
  loanamount: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
  // business
  businessname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/,
  businesslegalname: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,50}$/,
  businessaddress: /^[\dA-Za-zÀ-ÖØ-öø-ÿ'.,\-/\s]{1,200}$/,
  businesscity: /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,100}$/,
  businessstate: /^[A-Za-z]{2,}$/,
  businesszipcode: /^\d{5}(-\d{4})?$/,
  businessphonenumber: /^\+?(\d{1,4})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
  businesswebsite: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:\/?#\[\]@!$&'()*+,;=]*)?$/,
  taxidnumber: /^(?=(?:.*\d){2,})[A-Za-z0-9\s-]*$/,
  annualrevenue: /^\d{1,3}(,\d{3})*(\.\d{2})?$/,
  businessstartdate: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(\d{4})$/,
  requestamount: /^\d{1,3}(,\d{3})*(\.\d{2})?$/
};

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();


    // Check if a country is selected
//     // const countrySelected = document.querySelector('input[name="country"]:checked');
//     // if (!countrySelected) {
//     //   console.error("No country selected.");
//     //   alert("Please select a country.");
            // event.preventDefault();
//     //   return;
//     // }



    // Validate all inputs and selects in the current form step
    const currentStepElements = formSteps[formStepsNum].querySelectorAll('input, select');
    let allValid = true;

    currentStepElements.forEach(element => {
      if (element.tagName.toLowerCase() === 'input') {
        const pattern = patterns[element.name];
        if (pattern && !pattern.test(element.value)) {
          allValid = false;
          element.classList.add('invalid');
        } else {
          element.classList.remove('invalid');
          element.classList.add('valid');
        }
      } else if (element.tagName.toLowerCase() === 'select') {
        if (element.value === "") {
          allValid = false;
          element.classList.add('invalid');
        } else {
          element.classList.remove('invalid');
          element.classList.add('valid');
        }
      }
    });

    // If all inputs and selects are valid, proceed to the next step
    if (allValid) {
      formStepsNum++;
      updateFormSteps();
      updateProgressbar();
    } else {
      console.error("Some inputs or selects are invalid.");
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
