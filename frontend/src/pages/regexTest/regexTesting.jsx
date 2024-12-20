function regexTesting(type, input, role) {
  console.log("type", type);
  console.log("input", input);
  console.log("role", role);
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
    region:
      /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
    subject_id: /^(?!\s*$)[A-Za-z0-9_]+$/,
  };
  console.log("role", role);
  const keyMap =
    role === "student"
      ? {
          student_name: "name",
          student_phone: "phone",
          student_address: "address",
          student_birth: "birthday",
          student_email: "email",
          student_url: "url",
          student_descript: "descript",
          student_password: "password",
        }
      : (role === "tutor"
      ? {
          tutor_name: "name",
          tutor_phone: "phone",
          tutor_address: "address",
          tutor_birth: "birthday",
          tutor_email: "email",
          tutor_url: "url",
          tutor_password: "password",
          tutor_region: "region",
          tutor_descript:"descript",
          subject_id: "subject_id",
        }
      : {
          admission_name: "name",
          admission_phone: "phone",
          admission_address: "address",
          admission_birth: "birthday",
          admission_email: "email",
          admission_url: "url",
          admission_password: "password",
        });
        console.log("keyMap", keyMap);
  const patternKey = keyMap[type];
  if (patternKey && patterns[patternKey]) {
    console.log("patternKey", patternKey);
    return patterns[patternKey].test(input);
  }
  console.warn(`Unknown input type: ${type}`);
  return false;
}

export default regexTesting;
