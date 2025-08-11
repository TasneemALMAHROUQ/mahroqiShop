


const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); 


  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  try {
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
     
      localStorage.setItem('token', data.token);
      alert('Login successful!');
      
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    alert('Error connecting to server');
    console.error(error);
  }
});
