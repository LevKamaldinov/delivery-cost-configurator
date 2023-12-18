

const payButtons = document.querySelectorAll('.payBtn');
      termsButton = document.querySelector('.terms');
      modal = document.querySelector('.modal');
      submitButton = document.querySelector('.submit');
      forms = document.querySelectorAll('form');
      inputs = document.querySelectorAll('input');
      inputCVV = document.querySelector('.secretNumber');
      inputCardNumber = document.querySelector('.cardNumber');

const showPayment = (i) => {
    forms.forEach(el => {
        el.style.display = 'none';
    });
    forms[i].style.display = 'block';
    payButtons.forEach(el => {
        el.classList.remove('btn-primary')
    });
    payButtons[i].classList.add('btn-primary');
}

showPayment(0);

payButtons.forEach((btn, i) => {
    btn.addEventListener('click', () => showPayment(i));
});

const showModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

termsButton.addEventListener('click', () => showModal());

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

inputCardNumber.addEventListener('input', (e) => {
    const pattern = /[0-9]{4}/g;
          numbers = /[0-9]/;

    if (!numbers.test(e.data)) {
        inputCardNumber.value = inputCardNumber.value.slice(0, inputCardNumber.value.length - 1);
    }
    if (inputCardNumber.value.length >= 19) {
        inputCardNumber.value = inputCardNumber.value.slice(0, 19);
    }
    if (pattern.test(inputCardNumber.value.slice(-4)) && inputCardNumber.value.length < 19){
        inputCardNumber.value += " ";
    }
});

inputCVV.addEventListener('input', () => {
    if (inputCVV.value.length >= 3) {
        inputCVV.value = inputCVV.value.slice(0, 3);
    }
});

const warninMessageCheckbox = document.createElement('span');
warninMessageCheckbox.classList.add('warning');
warninMessageCheckbox.innerText = 'Please, check Terms and Conditions';

const warninMessageCVV = document.createElement('div');
warninMessageCVV.classList.add('warning');
warninMessageCVV.innerText = 'Please, enter a three-digit CVV/CVC your card number';

const warninMessageNumberCard = document.createElement('div');
warninMessageNumberCard.classList.add('warning');
warninMessageNumberCard.innerText = 'Please, enter a 16-digit your card number';

const warninMessageName = document.createElement('div');
warninMessageName.classList.add('warning');
warninMessageName.innerText = 'Please, enter a valid value';

const warninMessageCommon = document.createElement('div');
warninMessageCommon.classList.add('warning');
warninMessageCommon.innerText = 'Please, enter a valid value';

const showWarningMessage = (el, message) => {
    el.parentElement.append(message);
    setTimeout(() => {
        message.remove();
    }, 2000);
}
const validateCheckbox = (el) => {
    el.checked ? null : showWarningMessage(el, warninMessageCheckbox);
}

const validateCVV = (el) => {
    const pattern = /\d{3}/g;
    (el.value.length === 3 && pattern.test(el.value)) ? null : showWarningMessage(el, warninMessageCVV)
}

const validateCardNumber = (el) => {
    const pattern = /\d{16}/g;
    (el.value.length === 16 && pattern.test(el.value)) ? null : showWarningMessage(el, warninMessageNumberCard);
}

const validateMonth = (el) => {
    const pattern = /\d{2}/g;
    (el.value.length === 2 && pattern.test(el.value) && el.value <= 13) ? 
    null : el.parentElement.append(warninMessageCommon);
}

const validateYear = (el) => {
    const pattern = /\d{2}/g;
    (el.value.length === 2 && pattern.test(el.value) && el.value >= new Date().getFullYear()) ? 
    null : showWarningMessage(el, warninMessageCommon);
}

const validateName = (el) => {
    (el.value.length > 0) ? null : showWarningMessage(el, warninMessageName);
}

submitButton.addEventListener('click', () => { // в реальном коде лучше использовать submit, но здесь нет отправки данных, так что я использую click
    validateCheckbox(document.querySelector('.checkbox'));
    validateCVV(inputCVV);
    validateCardNumber(inputCardNumber);
    validateMonth(document.querySelector('.month'));
    validateYear(document.querySelector('.year'));
    validateName(document.querySelector('.name'));
})
