export const checkPassword = async (password: string) => {
  let mess = "";
  let isStrongPass = false;

  const hasLength = password.length < 8 ? false : true;
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (
    hasLength &&
    hasLowerCase &&
    hasUpperCase &&
    hasNumber &&
    hasSpecialChar
  ) {
    mess = "Mật khẩu hợp lệ.";
    isStrongPass = true;
  } else {
    mess =
      "Mật khẩu phải chứa 8 ký tự trở lên, phải có chữ thường, chữ hoa, chữ số và ký tự đặc biệt!";
    isStrongPass = false;
  }
  return { mess, isStrongPass };
};
