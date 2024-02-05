import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Register } from "~/types/register";

const ERROR_MESSAGES = {
  invalidName: "Invalid name",
  invalidEmail: "Please enter a valid email address",
  invalidPhone: "Invalid phone number",
  invalidPassword: "Invalid password",
};
const NAME_REGEX = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[@#$%^&+=!-])(?=.*\d)(?!.*\s).*$/;

const validateRegistration = (form: Register) => {
  const errors: Record<string, string> = {};

  if (!form.firstName) {
    errors.firstName = "Required";
  } else if (form.firstName.length > 20) {
    errors.firstName = "First name is too long";
  } else if (!NAME_REGEX.test(form.firstName)) {
    errors.firstName = ERROR_MESSAGES.invalidName;
  }

  if (!form.lastName) {
    errors.lastName = "Required";
  } else if (form.lastName.length > 20) {
    errors.lastName = "Last name is too long";
  } else if (!NAME_REGEX.test(form.lastName)) {
    errors.lastName = ERROR_MESSAGES.invalidName;
  }

  if (!form.email) {
    errors.email = "Required";
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = ERROR_MESSAGES.invalidEmail;
  }

  if (!form.address) {
    errors.address = "Required";
  }

  if (!form.phone) {
    errors.phone = "Required";
  } else {
    const parsedPhoneNumber = parsePhoneNumberFromString(form.phone, "PH");
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      errors.phone = ERROR_MESSAGES.invalidPhone;
    } else if (form.phone.length < 10) {
      errors.phone = "Phone Number must be at least 10 digits";
    }
  }

  if (!form.password) {
    errors.password = "Required";
  } else if (!PASSWORD_REGEX.test(form.password)) {
    errors.password = ERROR_MESSAGES.invalidPassword;
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default validateRegistration;
