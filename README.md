## Application workflow

To see the application running follow the link:<br />
Open [https://web-connect-public-fe.vercel.app](https://web-connect-public-fe.vercel.app)

1. Register user<br />

- navigate to [/register](https://web-connect-public-fe.vercel.app/register)
- all fields are required.<br />
- email should be unique <br />
- password and confirm password should match <br />
- proper validation errors <br />

2. Login user <br />

- navigate to [/login](https://web-connect-public-fe.vercel.app/login)
- all fields are required.<br />
- email should be alredy registered <br />
- password should be valid <br />
- proper validation errors <br />

3. Dashboard (don't have a profile) <br />

- logged in users are redirected to [/dashboard](https://web-connect-public-fe.vercel.app/dashboard)
- if it is a first log in and you dont have a created profile, all you can do is navigate to [/create-profile](https://web-connect-public-fe.vercel.app/create-profile) .<br />

4. Create Profile <br />

- navigate to [/create-profile](https://web-connect-public-fe.vercel.app/create-profile)<br />
- this route is available only for logged in users.<br />
- handle, status and skills are required fileds. If you don't provide them, you will receive a proper validation errors.<br />
- handle should be unique (handle is used later to distinct different users).<br />
- you can toggle on and off "Add Social Network Links", in case you want to add links to your social media accounts.<br />
- after submiting the form, you are redirected back to [/dashboard](https://web-connect-public-fe.vercel.app/dashboard). <br />

5. Dashboard (having a profile)<br />

- You can upload avatar image
- for edit a profile navigate to [/edit-profile](https://web-connect-public-fe.vercel.app/edit-profile)<br />
- for adding experience navigate to [/experiencee](https://web-connect-public-fe.vercel.app/experience)<br />
- for adding education navigate to [/education](https://web-connect-public-fe.vercel.app/education)<br />
- there is a link to navigate to the current logged in user preview page <br />
- in dashboard there is a list of alredy added educations and experiences, and a button to delete individual experience and education <br />
- there is a button for deleting the profile <br />

6. Edit Profile <br />

- navigate to [/edit-profile](https://web-connect-public-fe.vercel.app/edit-profile)<br />
- this route is available only for logged in users that alredy have a created profile .<br />
- status and skills are required fileds. If you don't provide them, you will receive a proper validation errors.<br />
- you cant change the handler field.<br />
- you can toggle on and off "Add Social Network Links", in case you want to add links to your social media accounts.<br />
- after submiting the form, you are redirected back to [/dashboard](https://web-connect-public-fe.vercel.app/dashboard). <br />

7. Add Education <br />

- navigate to [/education](https://web-connect-public-fe.vercel.app/education)<br />
- this route is available only for logged in users that alredy have a created profile .<br />
- school, degree, field of study and from date are required fileds. If you don't provide them, you will receive a proper validation errors.<br />
- a button to go back to dashboard <br />
- after submiting the form, you are redirected back to [/dashboard](https://web-connect-public-fe.vercel.app/dashboard) and the currently created education is added to the education's table in the dashboard <br />

8. Add Experience <br />

- navigate to [/experience](https://web-connect-public-fe.vercel.app/experience)<br />
- this route is available only for logged in users that alredy have a created profile .<br />
- job title, company and from date are required fileds. If you don't provide them, you will receive a proper validation errors.<br />
- a button to go back to dashboard <br />
- after submiting the form, you are redirected back to [/dashboard](https://web-connect-public-fe.vercel.app/dashboard) and the currently created experience is added to the experience's table in the dashboard <br />

9. Profiles <br />

- navigate to [/profiles](https://web-connect-public-fe.vercel.app/profiles)<br />
- list all created profiles

10. Individual Profile <br />

- navigate to [/profile/:handle](https://web-connect-public-fe.vercel.app/profile/v-ivanov)<br />
- display a individual profile

11. Posts

- navigate to [/posts](https://web-connect-public-fe.vercel.app/posts)<br />
- list all posts
- create a new post (with a required text field - validation error when submit without text field)
- up/down vode post
- delete if you are the owner of the post

12. Post

- navigate to [/post/:postId](https://web-connect-public-fe.vercel.app/post/62fd1eccef91498a2346b7c9)<br />
- display the post
- dispaly comments added to the post
- add comment (with a required text field - validation error when submit without text field)
- button back to posts
