
import { publicProcedure, router } from './trpc';
import {z} from 'zod';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import jwt from 'jsonwebtoken';

const todoInputTypes = z.object({
    title: z.string(),
    description: z.string(),
});

const userSignupTypes = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
    fullName: z.string(), 
});
const appRouter = router({

    signUp: publicProcedure
    .input(userSignupTypes)
    .mutation(async (opts) => {
      const email = opts.input.email;
      const password = opts.input.password;  
      const fullName = opts.input.fullName;
      //Do Database stuff here
      const token = jwt.sign({email}, "Zcr9sdFAqggJkPk8iebKx/OZY2oOuFGzSEh7dAZOxmM=",{expiresIn: "1h"});
        return {
            email,
            password,
            fullName,
            token
        }
    }),

    createTodo: publicProcedure
    .input(todoInputTypes)
    .mutation(async (opts) => {
      const title = opts.input.title;
      const description = opts.input.description; 
        //Do Database stuff here
        return {
    
            title,
            description,
            
        }
    })
});


const server = createHTTPServer({
    router: appRouter,
  });
   
  server.listen(3000);


export type AppRouter = typeof appRouter;

