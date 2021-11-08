# What I learnt building this project

- The use of Tailwind CSS for responsive styling. Small screens first.

- Using the following bash code to set up a new Next JS + Tailwind CSS environment.

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app
# or
yarn create next-app --example with-tailwindcss with-tailwindcss-app
```

- Using Tailwind plugins to get custome UIs

- Using Faker.js to get fake user data to populate data fields like the Stories section of the build.

- Using `grid` to be able to scale the colums on different breakpoints when designing the dashboard.

- implementing NextAuth.js as the User Authentication for signing in and out with the help of Firebase.

- Added more than one sign-in/sign-up providers, Github and Google.

- Using Recoil JS for state management instead of Redux because it is light-weight and a powerful global store state manager.

- Using Headless UI is poweful for accessable components and works well with Tailwind.

- Working with uploading image and caption to show on the timeline:
- - i uploaded the post to firestore then went ahead to upload the post to firebase storage
- - now that its in firebase storage we got the download URL and all we need to do is update the orginal doc with new post from the URL.

- Adding comments to firebase firestore
