function regexTesting(type, input) {
  const patterns = {
    name: /^([A-ZÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ][a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý]*\s?){2,50}$/u,
    phone: /^\+?[0-9\s\-\(\)]{7,15}$/,
    address:
      /^\d+\s+[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểẼỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừừửữự]+(?:\s+[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểẼỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừừửữự]*)*,\s+phường\s+\d+,\s+quận\s+[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểẼỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừừửữự0-9]+,\s+$/,
    birthday: /^\d{4}[\/\-](0[1-9]|1[0-2])[\/\-](0[1-9]|[12][0-9]|3[01])$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    url: /^(http|https):\/\/[a-zA-Z0-9\.\-]{3,}\.[a-zA-Z]{2,}$/,
    descript: /^.{0,200}$/,
    password: /^.{6,30}$/,
  };
  const keyMap = {
    student_name: "name",
    student_phone: "phone",
    student_address: "address",
    student_birth: "birthday",
    student_email: "email",
    student_url: "url",
    student_descript: "descript",
    student_password: "password",
  } || {
      teacher_name: "name",
      teacher_phone: "phone",
      teacher_address: "address",
      teacher_birth: "birthday",
      teacher_email: "email",
      teacher_url: "url",
      teacher_descript: "descript",
      teacher_password: "password",
    } || {
      admission_name: "name",
      admission_phone: "phone",
      admission_address: "address",
      admission_birth: "birthday",
      admission_email: "email",
      admission_url: "url",
      admission_descript: "descript",
      admission_password: "password",
    };
  const patternKey = keyMap[type];
  if (patternKey && patterns[patternKey]) {
    return patterns[patternKey].test(input);
  }
  console.warn(`Unknown input type: ${type}`);
  return false;
}

export default regexTesting;
