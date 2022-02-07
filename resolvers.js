const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  rejectOnNotFound: {
    findUnique: true,
  },
});



const resolvers ={
    // Query Here
    Query: {
        book:async(parent,args,context)=>{
            try { const book=  await prisma.book.findUnique({ where: { id: args.id } });
                if (book) {
                    return {status:200,data:[book],message:"Data Found",error:"null"};
                } else {
                    return {status:404,data:null,message:"",error:"Data Not Found"};
                }
            } catch (error) {
                return {status:500,data:null,message:"",error:"Server Error"};
            }
        },
        //
        books:async(parent,args,contex)=>{
            try {
             const books = await prisma.book.findMany({});
              if (books) {
                return {status:200,data:books,message:"Data Found",error:"null"};     
            }else{
                return {status:404,data:null,message:"",error:"Data Not Found"};
            }
            }catch (error) {
                return {status:500,data:null,message:"",error:"Server Error"};

            }         
        },
        //
        author:async(parent,args,context)=>{
            try { const author=  await prisma.author.findUnique({ where: { id: args.id } });
                if (author) {
                    return {status:200,data:[author],message:"Data Found",error:"null"};
                } else {
                    return {status:404,data:null,message:"",error:"Data Not Found"};
                }
            } catch (error) {
                return {status:500,data:null,message:"",error:"Server Error"};
            }
        },
        //
        authors:async(parent,args,contex)=>{
            try {
             const authors = await prisma.author.findMany({});
              if (authors) {
                return {status:200,data:authors,message:"Data Found",error:"null"};     
            }else{
                return {status:404,data:null,message:"",error:"Data Not Found"};
            }
            }catch (error) {
                return {status:500,data:null,message:"",error:"Server Error"};

            }         
        },
    },

    //Relations Here
    Book:{
        author:async(parent,args,context)=>{
            console.log(parent);
            return await prisma.author.findUnique({
                where: { id: parent.authorId },
              });
        }
    },
    Author:{
        books:async(parent,args,context)=>{
            //console.log(parent);
            return await prisma.book.findMany({
                where: { authorId: parent.id },
              });
        }
    },
};
module.exports=resolvers;