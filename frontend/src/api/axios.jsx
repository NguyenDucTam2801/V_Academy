import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

const studentURL = axios.create({
  baseURL: "http://localhost:3001/api/students",
});

const tutorURL = axios.create({
  baseURL: "http://localhost:3001/api/tutor",
});

const admissionURL = axios.create({
  baseURL: "http://localhost:3001/api/admissions",
});

export { studentURL, tutorURL, admissionURL };
