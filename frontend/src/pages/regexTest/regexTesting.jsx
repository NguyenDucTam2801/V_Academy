function regexTesting(type, input,role) {
  const patterns = {
    name: /^([A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ][a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*\s?){2,50}$/u,
    phone: /^\+?[0-9\s\-\(\)]{7,15}$/,
    address:
      /^([0-9A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ][0-9a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý\s,\.]*\s?){2,50}$/u,
    birthday: /^\d{4}[\/\-](0[1-9]|1[0-2])[\/\-](0[1-9]|[12][0-9]|3[01])$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    url: /^(http|https):\/\/[a-zA-Z0-9\.\-]{3,}\.[a-zA-Z]{2,}$/,
    descript: /^.{0,200}$/,
    password: /^.{6,30}$/,
  };
  console.log("role",role)
  const keyMap =role==="Student"? {
    student_name: "name",
    student_phone: "phone",
    student_address: "address",
    student_birth: "birthday",
    student_email: "email",
    student_url: "url",
    student_descript: "descript",
    student_password: "password",
  } : {
      tutor_name: "name",
      tutor_phone: "phone",
      tutor_address: "address",
      tutor_birth: "birthday",
      tutor_email: "email",
      tutor_url: "url",
      tutor_descript: "descript",
      tutor_password: "password",
    } 
  const patternKey = keyMap[type];
  if (patternKey && patterns[patternKey]) {
    return patterns[patternKey].test(input);
  }
  console.warn(`Unknown input type: ${type}`);
  return false;
}

export default regexTesting;
