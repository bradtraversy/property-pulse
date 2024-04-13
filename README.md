# Property Pulse

> A web application to help you find your next rental property.

This is the main project from my [Next 14 From Scratch Course](https://www.traversymedia.com/nextjs-from-scratch)

The `_theme_files` folder contains the pure HTML files with Tailwind classes.

<img src="/public/images/screen.jpg" />

# Contents

<!--toc:start-->

- [Property Pulse](#property-pulse)
- [Contents](#contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [`.env` File](#env-file)
    - [Install Dependencies](#install-dependencies)
    - [Run the Development Server](#run-the-development-server)
- [Bug Fixes, corrections and code FAQ](#bug-fixes-corrections-and-code-faq)
  - [BUG: Images are not deleted from Cloudinary](#bug-images-are-not-deleted-from-cloudinary)
  - [BUG: Mobile menu stays open when viewport is resized.](#bug-mobile-menu-stays-open-when-viewport-is-resized)
  - [Correction: a11y of menu open in Navbar.](#correction-a11y-of-menu-open-in-navbar)
  - [Corrections to PropertyAddForm](#corrections-to-propertyaddform)
    - [Our user can upload as many images as they want.](#our-user-can-upload-as-many-images-as-they-want)
    - [No need to check for component being mounted](#no-need-to-check-for-component-being-mounted)
    - [Unused state in PropertyAddForm](#unused-state-in-propertyaddform)
  - [BUG: API routes not sending a JSON response.](#bug-api-routes-not-sending-a-json-response)
  - [BUG: Missing import of Poppins font](#bug-missing-import-of-poppins-font)
  - [Correction: Use Next Link component for application links](#correction-use-next-link-component-for-application-links)
  - [Correction: Remove unused **loading** prop from LoadingPage](#correction-remove-unused-loading-prop-from-loadingpage)
  - [Correction: awaiting resolution of an array of strings](#correction-awaiting-resolution-of-an-array-of-strings)
  - [Correction: unused state in PropertyMap.jsx](#correction-unused-state-in-propertymapjsx)
  - [Bug: UnreadCount can be a negative number](#bug-unreadcount-can-be-a-negative-number)
- [Refactor to use Server components](#refactor-to-use-server-components)
  - [Client components that can be moved to server components](#client-components-that-can-be-moved-to-server-components)
  - [Remove components/Messages.jsx and change the page to a server component](#remove-componentsmessagesjsx-and-change-the-page-to-a-server-component)
  - [Changes to app/properties/page.jsx](#changes-to-apppropertiespagejsx)
  - [Use a server action to add a property](#use-a-server-action-to-add-a-property)
  - [Use a server action to update a property](#use-a-server-action-to-update-a-property)
  - [Make the profile page a server component](#make-the-profile-page-a-server-component)
    - [Deleting a property with a server action](#deleting-a-property-with-a-server-action)
  - [Using server actions for deleting or marking a message as read](#using-server-actions-for-deleting-or-marking-a-message-as-read)
  - [Using a server action for sending a message](#using-a-server-action-for-sending-a-message)
  - [Bookmark status and bookmarking a property server actions](#bookmark-status-and-bookmarking-a-property-server-actions)
  - [Get unread message count with a server action](#get-unread-message-count-with-a-server-action)
- [Further improvements](#further-improvements)
  - [Using VERCEL_URL for the site url](#using-vercelurl-for-the-site-url)
  - [Catch errors and rejections in an ErrorBoundry](#catch-errors-and-rejections-in-an-errorboundry)
  - [TODO:](#todo)
  - [License](#license)
  <!--toc:end-->

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

The code here has been updated since the course was published to fix bugs found by students of the course and answer common questions, if you are looking to compare your code to that from the course lessons then
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
A simple solution would be to add an event listener to the **Window** object
for the **resize** event and close the menu.

We can do this in our `useEffect` in [components/Navbar.jsx](./components/Navbar.jsx)

## Correction: a11y of menu open in Navbar.

Currently our `aria-expanded` attribute in our menu button is hard coded to
**false** even when our menu is actually open, which doesn't give the correct
status to those using accessibility tools like screen readers.  
For good accessibility in our application, we should ideally set this
value to state to correctly reflect if the menu is open or not.

Changes can be seen in [components/Navbar.jsx](./components/Navbar.jsx)

## Corrections to PropertyAddForm

### Our user can upload as many images as they want.

In our **PropertyAddForm** we state that a user can add up to 4 images, however
we don't have any logic to validate a maximum of 4 images were added, so they
can in fact add as many images as they like.

Changes can be seen in:

- [components/PropertyAddForm.jsx](./components/PropertyAddForm.jsx)
- [models/Property.js](./models/Property.js)

### No need to check for component being mounted

While we are in our [PropertyAddForm.jsx](./components/PropertyAddForm.jsx) we can also
remove the check for the component being mounted before rendering the form as there is no real need for this.

### Unused state in PropertyAddForm

In our [PropertyAddForm.jsx](./components/PropertyAddForm.jsx) we are using state
to manage our input values when they change but we never actually do anything with the state as we
are submitting the form using a form action to our API routes.  
So we can completely remove the complexity of managing state here.  
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

## Correction: Use Next Link component for application links

in our [components/InfoBox.jsx]('components/InfoBox.jsx') we should be using a
`<Link />` component instead of a `<a />` tag as here we are navigating the user
within our application.

## Correction: Remove unused **loading** prop from LoadingPage

In our [app/loading.jsx](app/loading.jsx) `LoadingPage` component we are
currently receiving a prop of **loading**, however a loading file component
doesn't actually receive any props - [source](https://nextjs.org/docs/app/api-reference/file-conventions/loading).  
So we can remove the prop entirely.

## Correction: awaiting resolution of an array of strings

Currently in our [app/api/properties/route.js](app/api/properties/route.js)
`POST` function for uploading images to Cloudinary, we are awaiting the
resolution of `imageUploadPromises` using `Promise.all`  
However `imageUploadPromises` is an Array of Strings - `string[]` not an array
of Promises. Additionally we are awaiting this on every iteration of our for
loop.  
So the code here has changed and `imageUploadPromises` has be renamed to
`imageUrls` to more declaratively represent what Type the Array is.

## Correction: unused state in PropertyMap.jsx

We currently have a **viewbox** state in our [PropertyMap.jsx](components/PropertyMap.jsx)
but we never actually use that state, so it can be completely removed from the component.

## Bug: UnreadCount can be a negative number

Currently if we say have **two unread** messages and **one read** message and we first mark the unread as read and then delete all three, the state for the GlobalProvider would be then **-3**
The UI would not show -3 though as the conditional check in UnreadMessageCount would check for `unreadCount > 0`. But our state will be incorrect.

We can fix this in our [components/Message.jsx](components/Message.jsx) by
checking **read** while updating our **unreadCount** state.  
While we are here we can also remove the unused import of **useEffect**

# Refactor to use Server components

The original course code was intended as an easy transition for students coming
from the MERN stack and so adopts a similar approach to a MERN application by using
mostly client components and making fetch requests to API routes for our data.

This **refactor** branch attempts to refactor the application to take a more modern
Next 14+ approach by using mostly server components and querying the database
directly in our server components.

NextJS themselves recommend whenever possible to fetch data in server components
and mutating or updating data whenever possible in **Server Actions**
[Source](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns)

This branch is built on top of the **bugfix** branch so includes all the bug
fixes and corrections above.

## Client components that can be moved to server components

- [components/HomeProperties.jsx](components/HomeProperties.jsx)
- [components/FeaturedProperties.jsx](components/FeaturedProperties.jsx)
- [app/properties/\[id\]/page.jsx](app/properties/[id]/page.jsx)
- [app/properties/search-results/page.jsx](app/properties/search-results/page.jsx)
- [app/properties/saved/page.jsx](app/properties/saved/page.jsx)

The above changes also depend on marking
[PropertyImages](components/PropertyImages.jsx) and
[ShareButtons](components/ShareButtons.jsx)
to client components as these both require client side JavaScript for user
interaction.

We also need a small utility function [convertToSerializeableObject](utils/convertToObject.js) as the result of querying our DB using Mongoose gives us back a instance of the Model, but to pass this to our client components the Object needs to be plain JavaScript Object.  
So first we call [Model.lean](https://mongoosejs.com/docs/tutorials/lean.html) on the query and then use our utility function to change any properties that have a `.toString` or `.toJSON` method on them to their respective `String` value.

With the above changes in place we no longer need a `fetchProperties` function
in our [utils/requests.js](utils/requests.js) module.

We can remove our **app/api/properties/search/route.js** as it's no longer used.

We can remove the **GET** route handler from [app/api/bookmarks/route.js](app/api/bookmarks/route.js) as it's no longer used.

We can delete our [app/api/properties/featured/](app/api/properties/featured/)
as it's no longer used.

## Remove components/Messages.jsx and change the page to a server component

The [app/messages/page.jsx](app/messages/page.jsx) component just returns the
`Messages` component so it seems simpler to just move the contents of `Messages`
to the page component and remove `Messages`. Additionally [app/messages/page.jsx](app/messages/page.jsx) can be made a server component.

We can then remove the **GET** function from our [app/api/messages/route.js](app/api/messages/route.js) as it's no longer used.

## Changes to app/properties/page.jsx

Currently [app/properties/page.jsx](app/properties/page.jsx) is a server
component but in turn renders [components/Properties.jsx](components/Properties.jsx) on the client and the `Properties` component then makes a fetch request to an API route handler in [app/api/properties/route.js](app/api/properties/route.js) but with the page being server rendered there is no need to do this as we can query the DB directly in our server component and pass props to `Properties` and in turn our `Pagination` component. We can even access the search params in our server component props for querying the DB for pagination.  
Our `Pagination` component can also be a server component and instead of buttons
with click events to navigate the user to the **next** / **prev** pages we can
use a `Link` component and conditionally render based on if there are next or
previous pages.

**Changes can be seen in**

- [app/properties/page.jsx](app/properties/page.jsx)
- [components/Properties.jsx](components/Properties.jsx)
- [components/Pagination.jsx](components/Pagination.jsx)

With the above changes we can then remove the `GET` route handler function from
[app/api/properties/route.js](app/api/properties/route.js) as it's no longer
used.

## Use a server action to add a property

Our [components/PropertyAddForm.jsx](components/PropertyAddForm.jsx) can use a
[Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
to submit the form, this removes the need for an API **POST** route handler in **app/api/properties/route.js** The **GET** has already been removed with previous changes so we can now delete that file.  
A server action automatically receives the **FormData** from the submitted form.
Additionally by using a server action we can now also use the [useFormStatus
hook](https://react.dev/reference/react-dom/hooks/useFormStatus) to give the
user some feedback about the state of adding their property before redirecting
them. This is implemented in a new component in [components/SubmitButton.jsx](components/SubmitButton.jsx) which we can drop in to any form to give some simple feedback to the user about if the form is being submitted or not.

**Changes can be seen in**

- [components/PropertyAddForm.jsx](components/PropertyAddForm.jsx)
- Delete file: [app/api/properties/route.js](app/api/properties/route.js)
- Create file: [app/actions/addProperty.js](app/actions/addProperty.js)
- Create file: [components/SubmitButton.jsx](components/SubmitButton.jsx)

## Use a server action to update a property

Much like our **PropertyAddForm** above we can also submit the form via a server
action.  
Our [app/properties/\[id\]/edit/page.jsx](app/properties/[id]/edit/page.jsx) page
component is already a server component so we can query the DB directly for the
property we want to update and pass this as a prop to our [PropertEditForm](components/PropertyEditForm.jsx), we can then use this data to pre populate the input values with the existing values and remove all the state, hooks and onChange event handlers from the PropertyEditForm component.  
We can also reuse our new [components/SubmitButton.jsx](components/SubmitButton.jsx) component to again give the user some feedback about the state of the form submission.

With these changes in place we can then remove the **GET /api/properties/:id**
route handler and the **PUT /api/properties/:id** route handler from [app/api/properties/\[id\]/route.js](app/api/properties/[id]/route.js) as they are no longer used.

While we are here it's also worth modifying our [middleware.js](middleware.js)
to make the edit page only accessible to authenticated users.

**Changes can be seen in**

- [app/properties/\[id\]/edit/page.jsx](app/properties/[id]/edit/page.jsx)
- [components/PropertyEditForm.jsx](components/PropertyEditForm.jsx)
- [app/api/properties/\[id\]/route.js](app/api/properties/[id]/route.js)
- [middleware.js](middleware.js)
- Create file: [app/actions/updateProperty.js](app/actions/updateProperty.js)

## Make the profile page a server component

Our [app/profile/page.jsx](app/profile/page.jsx) can be made into a server
component and fetch the users properties by directly querying the database.  
However we still need to dynamically update the users properties on the client
if and when a property is deleted by the user.  
We can do this by making a new client component [components/ProfileProperties.jsx](components/ProfileProperties.jsx) that receives the properties as a prop sets them in local state.

### Deleting a property with a server action

Server actions can be used for more than just form submissions, we can trigger
them on a button click from a client component - [source](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#non-form-elements).  
So we have a new action in [deleteProperty.js](app/actions/deleteProperty.js)
that is triggered when the user clicks to delete a property.

These changes mean we no longer need a [app/api/user/\[userId\]/route.js](app/api/user/[userId]/route.js) so we can delete that file.
We also no longer need a **DELETE** route handler in our [app/api/properties/\[id\]/route.js](app/api/properties/[id]/route.js) and since this is the last route handler we were using in that file, we can now delete that file.

**Changes can be seen in**

- [app/profile/page.jsx](app/profile/page.jsx)
- Create file: [components/ProfileProperties.jsx](components/ProfileProperties.jsx)
- Create file: [app/actions/deleteProperty.js](app/actions/deleteProperty.js)
- Delete file: [app/api/user/\[userId\]/route.js](app/api/user/[userId]/route.js)
- Delete file: [app/api/properties/\[id\]/route.js](app/api/properties/[id]/route.js)

## Using server actions for deleting or marking a message as read

We have already made our [components/Message.jsx](components/Message.jsx) a
server component that queries the database directly, we can also create two new
server actions [app/actions/markMessageAsRead.js](app/actions/markMessageAsRead.js) and [app/actions/deleteMessage.js](app/actions/deleteMessage.js) to mark a message as read and to delete a message respectively.  
With this in place we can then delete our [app/api/messages/\[id\]/route.js](app/api/messages/[id]/route.js)

**Changes can be seen in**

- [components/Message.jsx](components/Message.jsx)
- Create file: [app/actions/markMessageAsRead.js](app/actions/markMessageAsRead.js)
- Create file: [app/actions/deleteMessage.js](app/actions/deleteMessage.js)
- Delete file: [app/api/messages/\[id\]/route.js](app/api/messages/[id]/route.js)

## Using a server action for sending a message

We are already _getting_, _deleting_ and _marking as read_ the users messages using
server components and server actions so the last one to do for this part of the
application functionality is to make [components/PropertyContactForm.jsx](components/PropertyContactForm.jsx) use a [new server action](app/actions/addMessage.js) to send a message.  
We can use the [useFormStatus](https://react.dev/reference/react-dom/hooks/useFormStatus) and [useFormState](https://react.dev/reference/react-dom/hooks/useFormState) hooks to give some feedback to the user about the state of the submission and show a toast message or error depending on the server response.  
With these changes we can then delete the [app/api/messages/route.js](app/api/messages/route.js) file as it's not longer used.

**Changes can be seen in**

- [components/PropertyContactForm.jsx](components/PropertyContactForm.jsx)
- Create file: [app/actions/addMessage.js](app/actions/addMessage.js)
- Delete file: [app/api/messages/route.js](app/api/messages/route.js)

## Bookmark status and bookmarking a property server actions

In our [components/BookmarkButton.jsx](components/BookmarkButton.jsx) we can
check the status of a bookmark for the user and toggle the bookmark by using two
new server actions.  
With this change we can then remove our [app/api/bookmarks/check/route.js](app/api/bookmarks/check/route.js) and [app/api/bookmarks/route.js](app/api/bookmarks/route.js) API route handlers.

**Changes can be seen in**

- [components/BookmarkButton.jsx](components/BookmarkButton.jsx)
- Delete file: [app/api/bookmarks/check/route.js](app/api/bookmarks/check/route.js)
- Delete file: [app/api/bookmarks/route.js](app/api/bookmarks/route.js)
- Create file: [app/actions/checkBookmarkStatus.js](app/actions/checkBookmarkStatus.js)
- Creaet file: [app/actions/bookmarkProperty.js](app/actions/bookmarkProperty.js)

## Get unread message count with a server action

We have one remaining API route handler for getting the unread message count.  
But we can use a server action here too.
Currently we are making a fetch request to an API route handler to get the
unread message count in our [UnreadMessageCount.jsx](components/UnreadMessageCount.jsx) component but since the
[GlobalContext](context/GlobalContext.js) is responsible for managing this state
then it makes sense to use our new server action in the GlobalContext Provider
component, which we can do in a **useEffect**.  
Fetching the unread message count does however rely on a user being currenlty
logged in, so to be able to consume **AuthProvder** state our **GlobalContext**
needs to be a descendent of the **AuthProvider**.

**Changes can be seen in**

- [app/layout.jsx](app/layout.jsx)
- [components/UnreadMessageCount.jsx](components/UnreadMessageCount.jsx)
- [components/Navbar.jsx](components/Navbar.jsx) (remove prop form
  UnreadMessageCount component)
- [context/GlobalContext.js](context/GlobalContext.js)
- Create file: [app/actions/getUnreadMessageCount.js](app/actions/getUnreadMessageCount.js)
- Delete file: [app/api/messages/unread-count/route.js](app/api/messages/unread-count/route.js)

# Further improvements

## Using VERCEL_URL for the site url

NextJS allows us to set env variables dynamically in our [next.config.mjs](next.config.mjs)
We can use this to get the deployed site url at build time in production and
fallback to **localhost** in development.  
This avoids having to first deploy the site, then get the site url and manually
set it as a env varialble after the build then rebuild the deployed app.  
We can also do the same in our [ShareButtons.jsx](components/ShareButtons.jsx)

> NOTE: we need to check `process.env.VERCEL_URL` on the server so we do this in
> the parent page component i.e.
> [app/properties/\[id\]/page.jsx](app/properties/[id]/page.jsx)

Together with moving the majority of our data fetching to our server components
and removing many of our API route handlers we can also remove **NEXT_PUBLIC_DOMAIN** and **NEXT_PUBLIC_API_DOMAIN** from our **.env** file which streamlines the process of moving to production from development.  
We only needed these because we were making fetch requests from server components to API route handlers.

**Changes can be seen in**

- [components/ShareButtons.jsx](components/ShareButtons.jsx)
- [env.example](env.example)
- [next.config.mjs](next.config.mjs)

## Catch errors and rejections in an ErrorBoundry

Any time our application experiences an error thrown by us (such as from our server
actions) or by some other issue (like a database connection timeout from
Mongoose) then we can **catch** that in an [ ErrorBoundry ](https://nextjs.org/docs/app/building-your-application/routing/error-handling) by creating a top
level [error.js](app/error.js) client component and show something meaningful to
the user about what went wrong. If we then don't catch the error lower down in
our component tree to do something more specific with then this page will
render and provide a option for the user to try again or safely return to the
home page.

Test by temporarily throwing an error in any page or any server action, then
trigger the server action, such as throwing an error in [app/actions/addMessage.js](app/actions/addMessage.js) then try and send a message.

```js
throw new Error('This is just a test error');
```

**Changes can be seen in**

- Create file: [error.jsx](app/error.jsx)
- [config/database.js](config/database.js)

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
