export default function isStrongPassword(password:string) {
    return (
      /[A-Z]/g.test(password) &&
      /[a-z]/g.test(password) &&
      /[^a-zA-Z0-9]/g.test(password) &&
      /[0-9]/g.test(password) &&
      password.length > 8
    );
  }
