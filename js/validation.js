const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    clearErrors();

    let isValid = true;

    if (fullName === '') {
      showError('fullNameError', 'Введите полное имя');
      isValid = false;
    } else if (fullName.length < 3) {
      showError('fullNameError', 'Имя должно содержать минимум 3 символа');
      isValid = false;
    }

    if (email === '') {
      showError('emailError', 'Введите email');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('emailError', 'Введите корректный email (например: user@example.com)');
      isValid = false;
    }

    if (username === '') {
      showError('usernameError', 'Введите логин');
      isValid = false;
    } else if (username.length < 3) {
      showError('usernameError', 'Логин должен содержать минимум 3 символа');
      isValid = false;
    }

    if (password === '') {
      showError('passwordError', 'Введите пароль');
      isValid = false;
    } else if (password.length < 8) {
      showError('passwordError', 'Пароль должен содержать минимум 8 символов');
      isValid = false;
    }

    if (confirmPassword === '') {
      showError('confirmPasswordError', 'Подтвердите пароль');
      isValid = false;
    } else if (password !== confirmPassword) {
      showError('confirmPasswordError', 'Пароли не совпадают');
      isValid = false;
    }

    if (isValid) {
      alert('Регистрация успешна!');
      registerForm.reset();
    }
  });

  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  if (togglePassword) {
    togglePassword.addEventListener('click', function (e) {
      e.preventDefault();
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = '🙈';
      } else {
        passwordInput.type = 'password';
        togglePassword.textContent = '👁️';
      }
    });
  }
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    clearLoginErrors();
    let isValid = true;

    if (email === '') {
      showError('loginEmailError', 'Введите email');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('loginEmailError', 'Введите корректный email');
      isValid = false;
    }

    if (password === '') {
      showError('loginPasswordError', 'Введите пароль');
      isValid = false;
    }

    if (isValid) {
      alert('✓ Вход успешен! (В реальном приложении проверка на сервере)');
      loginForm.reset();
    }
  });

  const toggleLoginPassword = document.getElementById('toggleLoginPassword');
  const loginPasswordInput = document.getElementById('loginPassword');

  if (toggleLoginPassword) {
    toggleLoginPassword.addEventListener('click', function (e) {
      e.preventDefault();
      if (loginPasswordInput.type === 'password') {
        loginPasswordInput.type = 'text';
        toggleLoginPassword.textContent = '🙈';
      } else {
        loginPasswordInput.type = 'password';
        toggleLoginPassword.textContent = '👁️';
      }
    });
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;

    const inputId = elementId.replace('Error', '');
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.classList.add('error');
    }
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll('#registerForm .error-message');
  errorElements.forEach(el => el.textContent = '');

  const inputElements = document.querySelectorAll('#registerForm input');
  inputElements.forEach(el => el.classList.remove('error'));
}

function clearLoginErrors() {
  const errorElements = document.querySelectorAll('#loginForm .error-message');
  errorElements.forEach(el => el.textContent = '');

  const inputElements = document.querySelectorAll('#loginForm input');
  inputElements.forEach(el => el.classList.remove('error'));
}

document.addEventListener('DOMContentLoaded', function () {
  const allInputs = document.querySelectorAll('input');

  allInputs.forEach(input => {
    input.addEventListener('input', function () {
      if (this.classList.contains('error')) {
        this.classList.remove('error');
        const errorId = this.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
          errorElement.textContent = '';
        }
      }
    });
  });
});

