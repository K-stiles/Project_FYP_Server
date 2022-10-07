const validateRegisterInput = (firstName, lastName, email, password, phone) => {
     const errors = {};
     if (firstName.trim() === "") {
          errors.firstName = "firstName must not be empty";
     }
     if (lastName.trim() === "") {
          errors.lastName = "lastName must not be empty";
     }
     if (email.trim() === "") {
          errors.email = "Email must not be empty";
     } else {
          const regEx =
               /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
          if (!email.match(regEx)) {
               errors.email = "Email must be a valid email address";
          }
     }
     if (phone.trim() === "") {
          errors.phone = "Phone must not be empty";
     }
     //  else {
     //      const phoneRegEx =
     //           /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
     //      if (!phone.match(phoneRegEx)) {
     //           errors.phone = "Phone must be a valid phone address";
     //      }
     // }
     if (password === "") {
          errors.password = "Password must not empty";
     } else if (password.length < 6) {
          errors.password = "Passwords must bee at least 6 characters long";
     }

     return {
          errors,
          valid: Object.keys(errors).length < 1,
     };
};

const validateLoginInput = (email, password) => {
     const errors = {};
     if (email.trim() === "") {
          errors.email = "Email must not be empty";
     }
     if (password.trim() === "") {
          errors.password = "Password must not be empty";
     }

     return {
          errors,
          valid: Object.keys(errors).length < 1,
     };
};

export { validateLoginInput, validateRegisterInput };
