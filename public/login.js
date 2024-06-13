document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('http://localhost:4000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (!response.ok) {
          throw new Error('Error al iniciar sesión');
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.token);
  
        // Cerrar el modal
        $('#loginModal').modal('hide');
  
        // Redirigir a la página principal o dashboard
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        loginError.classList.remove('d-none');
      }
    });
  });
  