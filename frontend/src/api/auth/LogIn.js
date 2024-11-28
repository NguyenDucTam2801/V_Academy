import axios from "axios";
export const logInAPI = async (formData) => {
  if (formData.role === "Student") {
    axios
      .post("http://localhost:3001/api/students/studentSignIn", {
        username: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log("response data: " + response.data);
        return { success: true, message: response.data };
      })
      .catch((error) => {
        console.error("Error:", error);
        return { success: false, message: "An unexpected error occurred" };
      });
  } else if (formData.role === "Turtor") {
    try {
      const response = await fetch(
        "http://localhost:3001/api/turtors/turtorSignIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        const error = await response.json();
        return { success: false, message: error.responseMessage };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  } else if (formData.role === "Admission") {
    try {
      const response = await fetch(
        "http://localhost:3001/api/admissions/admissionSignIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        const error = await response.json();
        return { success: false, message: error.responseMessage };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};
