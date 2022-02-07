const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: true,
  },
});

exports.Mutation = {
  addAuthor: async (parent, {input}) => {
    try {
      let {name,age} = input;  
      let author = await prisma.author.create({
        data: {name: name,age: age,},
      });
      if (author) {
        return{status:200,message:`${name} Created Successfully`,error:""};
        
      } else {
        return{status:404,message:"",error:`${name} Can't Be Created`};
      }
      
    } catch (error) {
        return{status:500,message:"",error:"Server Error"};
    }

  },
  addBook: async (parent,  {input}) => {
    try {
      let {name,genre,authorId} = input;  
      const book = await prisma.book.create({
        data: {
          name: name,
          genre: genre,
          authorId: authorId,
        },
      });
      if (book) {
        return{status:200,message:`${name} Created Successfully`,error:""};
        
      } else {
        return{status:404,message:"",error:`${name} Can't Be Created`};
      }
    } catch (error) {
      return{status:500,message:"",error:"Server Error"};
    }
 
  },
  deleteAuthor: async (parent, {id}) => {
    try {
     const author =  await prisma.author.delete({ where: { id: id } });
  //   console.log(author);
     if (author) {
      return{status:200,message:`${author.name} Deleted Successfully`,error:""};
      
    } else {
      return{status:404,message:"",error:`${author.name} Can't Be Deleted`};
    }
    } catch (error) {
      return{status:500,message:"",error:"Server Error"};
    }
  },
  deleteBook: async (parent, {id}) => {
    try {
     const book =  await prisma.book.delete({ where: { id: id } });
      if (book) {
        return{status:200,message:`${book.name} Deleted Successfully`,error:""};
        
      } else {
        return{status:404,message:"",error:`${book.name} Can't Be Deleted`};
      }
    } catch (error) {
      return{status:500,message:"",error:"Server Error"};
    }
  },
  updateAuthor: async (parent, {id,input}) => {
    try {
      let{name,age}= input;
      const author = await prisma.author.update({
        where: { id: id },
        data: { name: name ,age:age},
      });
      if (author) {
        return{status:200,message:`${name} Updated Successfully`,error:""};
        
      } else {
        return{status:404,message:"",error:`${name} Can't Be Updated`};
      }
    } catch (error) {
      return{status:500,message:"",error:"Server Error"};
    }

  },
  updateBook: async (parent, {id,input}) => {
    try {
      let {name,genre,authorId} = input;
      const book = await prisma.book.update({
        where: { id: id },
        data: { name: name , genre:genre, authorId:authorId},
      });
      if (book) {
        return{status:200,message:`${name} Updated Successfully`,error:""};
        
      } else {
        return{status:404,message:"",error:`${name} Can't Be Updated`};
      }
    } catch (error) {
      return{status:500,message:"",error:"Server Error"};
    }

  },
};
