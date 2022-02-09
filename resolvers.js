const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: true,
  },
});

const resolvers = {
  // Query Here
  Query: {
    book: async (parent, args, context) => {
      try {
        const book = await prisma.book.findUnique({ where: { id: args.id } });
                return book;
      } catch (error) {
        return error;
      }
    },
    //
    books: async (parent, args, contex) => {
      try {
        const books = await prisma.book.findMany({});
        books.map((i)=>
        delete i.__typename,
        )

        return books;
      } catch (error) {
        return error;
      }
    },
    //
    author: async (parent, args, context) => {
      try {
        const author = await prisma.author.findUnique({
          where: { id: args.id },
        });

        return author;
      } catch (error) {
        return error;
      }
    },
    //
    authors: async (parent, args, contex) => {
      try {
        const authors = await prisma.author.findMany({});

        return authors;
      } catch (error) {
        return error;
      }
    },
  },

  //Relations Here
  Book: {
    author: async (parent, args, context) => {
      return await prisma.author.findUnique({
        where: { id: parent.authorId },
      });
    },
  },
  Author: {
    books: async (parent, args, context) => {
      //console.log(parent);
      return await prisma.book.findMany({
        where: { authorId: parent.id },
      });
    },
  },
};
module.exports = resolvers;
