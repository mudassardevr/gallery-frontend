const API_URL = "https://gallery-backend-sgma.onrender.com/api/auth";

//FRONTEND TO BACKEND CONNECT auth.js
// LOGIN API
export const loginAPI = async (credentails) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentails),
  });

  return response.json();
};

//REGISTER API
export const registerAPI = async (credentails) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentails),
  });
  return response.json();
};

//FORGOT PASSWORD OTP SEND
export const forgotPasswordAPI = async (email) => {
  const response = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const text = await response.text();
  // return response.json();
   try {
    return JSON.parse(text);
  } catch {
    return { success: false, error: text };
  }
};

//VERIFY-OTP
export const verifyOtpAPI = async (email, otp) => {
  const response = await fetch(`${API_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });
  return response.json();
};

//RESET-PASSWORD
export const resetPasswordAPI = async (email, newPassword) => {
  const response = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      newPassword,
    }),
  });
  return response.json();
};


// SIGN WITH GOOGLE ;
export const googleAPI = async(token) => {

  try {
    const response = await fetch(`${API_URL}/google`, {
      method : "POST", 
      headers : {
        "Content-type" : "application/json",
      },
      body: JSON.stringify( { token })
    });

    return response.json()
    
  } catch (error) {
    
    console.error("Google API Error:", error);
    return { success: false, error: "Google login failed" };
  }


}
