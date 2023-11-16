import { Register } from "~/types/register";

const ERROR_MESSAGES = {
  required: "Required",
  invalidEmail: "Please enter a valid email address",
  invalidPhone: "Invalid Phone Number",
  invalidPassword: "Invalid password",
  passwordsNotMatch: "Passwords do not match",
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/;
const PHONE_REGEX = /^(09|\+639)\d{9}$/;

const validateRequired = (value: string | undefined): string | undefined => {
  return value ? undefined : ERROR_MESSAGES.required;
};

const validateEmail = (email: string | undefined): string | undefined => {
  return email && !EMAIL_REGEX.test(email)
    ? ERROR_MESSAGES.invalidEmail
    : undefined;
};

const validatePhone = (phone: string | undefined): string | undefined => {
  return phone && !PHONE_REGEX.test(phone)
    ? ERROR_MESSAGES.invalidPhone
    : undefined;
};

const validatePassword = (password: string | undefined): string | undefined => {
  return password && !PASSWORD_REGEX.test(password)
    ? ERROR_MESSAGES.invalidPassword
    : undefined;
};

export const validateRegistration = (form: Register) => {
  const errors: Record<string, string> = {};

  errors.firstName = validateRequired(form.firstName) || "";
  errors.lastName = validateRequired(form.lastName) || "";
  errors.email =
    validateRequired(form.email) || validateEmail(form.email) || "";
  errors.address = validateRequired(form.address) || "";
  errors.phone =
    validateRequired(form.phone) || validatePhone(form.phone) || "";
  errors.password =
    validateRequired(form.password) || validatePassword(form.password) || "";
  errors.confirmPassword =
    validateRequired(form.confirmPassword) ||
    (form.password !== form.confirmPassword
      ? ERROR_MESSAGES.passwordsNotMatch
      : undefined) ||
    "";

  return errors;
};
