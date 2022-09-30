import Books from "../../utils/DB.js";

const user = {
  Query: {
    books: () => {
      return Books;
    },
  },
};

export default user;
