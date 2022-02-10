const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: true,
  },
});

exports.Mutation = {
  addAuthor: async (parent, { input }) => {
    try {
      let { name, age } = input;
      await prisma.author.create({
        data: { name: name, age: age },
      });
      return "Created Succesfully";
    } catch (error) {
      return "Can't Create Author";
    }
  },
  addBook: async (parent, { input }) => {
    try {
      let { name, genre, authorId } = input;
      await prisma.book.create({
        data: {
          name: name,
          genre: genre,
          authorId: authorId,
        },
      });
      return "Created Succesfully";
    } catch (error) {
      return "Can't Create Book";
    }
  },
  deleteAuthor: async (parent, { id }) => {
    try {
      await prisma.author.delete({ where: { id: id } });
      return "Deleted Succesfully";
    } catch (error) {
      return "Can't Delete";
    }
  },
  deleteBook: async (parent, { id }) => {
    try {
      await prisma.book.delete({ where: { id: id } });
      return "Deleted Succesfully";
    } catch (error) {
      return "Can't Delete";
    }
  },
  updateAuthor: async (parent, { id, input }) => {
    try {
      let { name, age } = input;
      await prisma.author.update({
        where: { id: id },
        data: { name: name, age: age },
      });

      return `${name} Updated Successfully`;
    } catch (error) {
      return "Can't Update";
    }
  },
  updateBook: async (parent, { id, input }) => {
    try {
      let { name, genre, authorId } = input;
      await prisma.book.update({
        where: { id: id },
        data: { name: name, genre: genre, authorId: authorId },
      });
      return `${name} Updated Successfully`;
    } catch (error) {
      return "Can't Update";
    }
  },
};
