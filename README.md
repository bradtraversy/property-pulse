# Property Pulse

> A web application to help you find your next rental property.

This is the main project from my [Next 14 From Scratch Course](https://www.traversymedia.com/nextjs-from-scratch)

The `_theme_files` folder contains the pure HTML files with Tailwind classes.

<img src="/public/images/screen.jpg" />

## Features

Here are some of the current features that Property Pulse has:

- [x] User authentication with Google & Next Auth
- [x] User authorization
- [x] Route protection
- [x] User profile with user listings
- [x] Property Listing CRUD
- [x] Property image upload (Multiple)
- [x] Property search
- [x] Internal messages with 'unread' notifications
- [x] Photoswipe image gallery
- [x] Mapbox maps
- [x] Toast notifications
- [x] Property bookmarking / saved properties
- [x] Property sharing to social media
- [x] Loading spinners
- [x] Responsive design (Tailwind)
- [x] Custom 404 page

Property Pulse uses the following technologies:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Photoswipe](https://photoswipe.com/)
- [Cloudinary](https://cloudinary.com/)
- [Mapbox](https://www.mapbox.com/)
- [React Map GL](https://visgl.github.io/react-map-gl/)
- [React Geocode](https://www.npmjs.com/package/react-geocode)
- [React Spinners](https://www.npmjs.com/package/react-spinners)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Share](https://www.npmjs.com/package/react-share)

## Getting Started

### Prerequisites

- Node.js version 18 or higher
- MongoDB Atlas account and a cluster. Sign up and create a cluster at [MongoDB](https://www.mongodb.com/)
- Cloudinary account. Sign up at [Cloudinary](https://cloudinary.com/)
- Google console account. Sign up at [Google Cloud](https://console.cloud.google.com/)
- Mapbox account. Sign up at [Mapbox](https://www.mapbox.com/)

### `.env` File

Rename the `env.example` file to `.env` and fill in the following environment variables:

- Get your MongoDB connection string from your MongoDB Atlas cluster and add it to `MONGODB_URI`.
- Get your Google client ID and secret from your Google console account and add them to `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
- Add a secret to `NEXTAUTH_SECRET`. You can generate with the following command:
  ```bash
  openssl rand -base64 32
  ```
- Get your Cloudinary cloud name, API key, and API secret from your Cloudinary account and add them to `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
- Get your Mapbox token from your Mapbox account and add it to `NEXT_PUBLIC_MAPBOX_TOKEN`.
- Get your Google Geocoding API key from your Google console account and add it to `NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY`.

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

# Bug Fixes, corrections and code FAQ

The code here in the main branch has been updated since the course was published to fix bugs found by students of the course and answer common questions, if you are looking to compare your code to that from the course lessons then
please refer to the [originalcoursecode](https://github.com/bradtraversy/property-pulse/tree/originalCourseCode) branch of this repository.

There are detailed notes in the comments that will hopefully help you understand
and adopt the changes and corrections.  
An easy way of seeing all the changes and fixes is to use a note highlighter
extension such as [This one for VSCode](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) or [this one for Vim](https://github.com/folke/todo-comments.nvim) Where by you can easily list all the **NOTE:** and **FIX:** tags in the comments.

## BUG: Images are not deleted from Cloudinary

When a user deletes a property it should also delete the property images from
Cloudinary.

We can do this in our `DELETE` function in [app/api/properties/[id]/route.js](./app/api/properties/%5Bid%5D/route.js)

## BUG: Mobile menu stays open when viewport is resized.

If the mobile menu is open and the view port size changes (such as the user
rotating their device) then the menu stays open and fills much of the screen.
A simple solution would be to add an event listiener to the **Window** object
for the **resize** event and close the menu.

We can do this in our `useEffect` in [components/Navbar.jsx](./components/Navbar.jsx)

## Correction: a11y of menu open in Navbar.

Currently our `aria-expanded` attribute in our menu button is hard coded to
**false** even when our menu is actually open, which doesn't give the correct
status to those using accessibility tools like screen readers.  
For good accessibility in our application, we should ideally set this
value to state to correctly reflect if the menu is open or not.

Changes can be seen in [components/Navbar.jsx](./components/Navbar.jsx)

## BUG: Our user can upload as many images as they want.

In our **PropertyAddForm** we state that a user can add up to 4 images, however
we don't have any logic to validate a maximum of 4 images were added, so they
can in fact add as many images as they like.

Changes can be seen in:

- [components/PropertyAddForm.jsx](./components/PropertyAddForm.jsx)
- [models/Property.js](./models/Property.js)

While we are in our [PropertyAddForm.jsx](./components/PropertyAddForm.jsx) we can also remove the check for the component being mounted before rendering the form as there is no real need for this.  
We can also remove all state and onChange handler functions as we are submitting
the form with a form action to our API routes, so we don't really do anything
with the local state.
This greatly simplifies the code in the **PropertyAddForm**.

## BUG: API routes not sending a JSON response.

When we are making requests to our API routes we are expecting a **JSON**
response and parsing the response as JSON. However our API routes are sending
back a **text/plain** Response. This has led to issues for some students in
fetching the relevant data from our API routes.

If you log out the headers of the Response you will see it has a
**'Content-Type': 'text/plain'** header, which is the default.  
Since we are expecting **JSON** then really we should be sending a a
**'Content-Type': 'application/json'** header with the Response.

If you are seeing issues with parsing the response from making requests to the
API routes then this is likely the fix you need.

**Before with text/plain response:**

```js
return new Response(JSON.stringify(properties), {
  status: 200,
});
```

Instead we can use the [Response.json](https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static) static method to send back a Response that includes a **Content-Type** header that is set to **application/json**:

```js
return Response.json(properties);
```

The default status code is set to **200** so we don't need to specify a status
code for a good response.

Changes can be seen in all our **app/api/\*\*/route.js** files.

## BUG: Missing import of Poppins font

In our [tailwind.config.js](tailwind.config.js) we have:

```js
extend: {
  fontFamily: {
    sans: ['Poppins', 'sans-serif'],
  },
```

So using the **Poppins** as our **sans** Tailwind font.  
However we also need to import/source that font if we want to use it in the
project.

Changes can be seen in [globals.css](assets/styles/globals.css)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
