import { Login } from "~/types/login";

export const validateLogin = (form: Login) => {
  const errors = {
    state: "validated",
    emailError: "",
    passwordError: "",
  };

  if (form.email.length === 0) {
    errors.state = "error";
    errors.emailError = "Required";
  }

  if (form.password.length === 0) {
    errors.state = "error";
    errors.passwordError = "Required";
  }

  return errors;
};
