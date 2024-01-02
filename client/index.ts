import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';
//     👆 **type-only** import
 
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});

 async function main() {
const user = await trpc.signUp.mutate({
    email: "dheerajsingh56696@gmail.com",
    password: "123456789",
    fullName: "Dheeraj Singh"
});
console.log(user);
}

main();