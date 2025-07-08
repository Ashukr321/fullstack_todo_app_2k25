
// Access the variable in your code:
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// register 
const registerUser = async (name, email, password) => {
  const response = await fetch(`${baseUrl}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });
  const resData = await response.json();
  return resData;
}

// login 
const loginUser = async (email, password) => {
  const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json"
    },
    body: JSON.stringify({ email, password })
  })
  const resData = await response.json();
  return resData;
}


export { registerUser, loginUser };

