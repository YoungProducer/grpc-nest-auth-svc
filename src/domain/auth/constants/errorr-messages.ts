export const authServiceErrorMsgs = {
  usernameAlreadyTaken: (username: string) =>
    `Username: ${username} is already taken`,
  emailAlreadyTaken: (email: string) => `Email: ${email} is already taken`,
  userNotFound: (field: string, value: string) =>
    `User with ${field}: ${value} was not found`,
  invalidPassword: () => `Password is invalid`,
};
