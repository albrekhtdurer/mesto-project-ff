function showInputError(options) {
  const {
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
    errorMessage,
  } = options;
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(options) {
  const { formElement, inputElement, inputErrorClass, errorClass } = options;
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError({
      formElement: formElement,
      inputElement: inputElement,
      inputErrorClass: inputErrorClass,
      errorClass: errorClass,
      errorMessage: inputElement.validationMessage,
    });
  } else {
    hideInputError({
      formElement: formElement,
      inputElement: inputElement,
      inputErrorClass: inputErrorClass,
      errorClass: errorClass,
    });
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (input) {
    return !input.validity.valid;
  });
}

function changeButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function setListenersForInputs(options) {
  const {
    inputList,
    formElement,
    inputErrorClass,
    errorClass,
    buttonElement,
    inactiveButtonClass,
  } = options;
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      changeButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

export function enableValidation(options) {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const inputList = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      options.submitButtonSelector
    );
    changeButtonState(inputList, buttonElement, options.inactiveButtonClass);
    setListenersForInputs({
      inputList: inputList,
      formElement: formElement,
      inputErrorClass: options.inputErrorClass,
      errorClass: options.errorClass,
      buttonElement: buttonElement,
      inactiveButtonClass: options.inactiveButtonClass,
    });
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach(function (inputElement) {
    hideInputError({
      formElement: formElement,
      inputElement: inputElement,
      inputErrorClass: validationConfig.inputErrorClass,
      errorClass: validationConfig.errorClass,
    });
    const inputTextsToClear = validationConfig.inputTextsToClear;
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    if (
      inputTextsToClear &&
      inputTextsToClear.length > 0 &&
      inputTextsToClear.includes(inputElement.id)
    ) {
      inputElement.value = '';
      changeButtonState(
        inputList,
        buttonElement,
        validationConfig.inactiveButtonClass
      );
    }
  });
}
