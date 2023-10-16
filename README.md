![](/src/images/BGxpl.png)

# Project Information 

Welcome to the our BGXplore forum! Here you can create (and find) posts about our local cuisine, culture, nature, travel tips and so on.

**Before you are logged in you:**
- can see the most recently created posts
- can see the most upvoted posts
- can see the most commented posts

as well as how many users and posts we have so far. Why don't you join in?

**Simply register and login to enable all other user actions:**
- browse posts - you can select category, filter by username and author, sort by newest/oldest or most upvoted
- like and dislike posts, or if you do not have time - save them for later
- access your user profile and see all your liked and saved posts
- create your posts and edit them when needed, you can also add a category to make them easier to find or edit and add a photo to make them even more beautiful
- view a single post with all its details including comments and replies and express you opinion as well
- just be polite, because we also have admins and moderators which can block you if you don't adhere to social norms
- and if you are blocked you cannot login and enjoy all the nice features that brings

**Our admins:**
- can delete anything they want - posts, comments, replies
- can edit anything as well
- can block users so that the blocked user cannot express their opinion 
- can unblock users if they promise they will do better in the future

**Our moderators:**
- help the admins to manage content
- can also block you

**So join in, below you can see how to find instructions on setting up the BGXplore forum.**


# Project Setup and Local Deployment Guide

This guide provides instructions for setting up and running our first React project locally from the GitLab repository.

## Prerequisites

Before you begin, ensure you have the following software installed:

- Git
- Node.js
- Visual Studio Code

## Clone the Repository

1. Open https://gitlab.com/web-project-1-group-4/forum
2. Click on the dropdown Clone button in the right section
3. Open in your IDE - Visual Studio Code (HTTPS)

## Install dependencies

Navigate to the forum directory (where the package.json is located) and install node_modules

    cd forum
    npm install

## Run the project

Run the project and open vite

    npm run dev

    ... Vite is loading
    
    o

## Database structure
Here is an overlook of our database structure in Firebase 

```
firebase realtime database
│ 
├── users
│   ├── username
│       ├── blocked: {bool}
│       ├── email: {email-string}
│       ├── firstName: {string}
│       ├── handle: {string}
│       ├── lastName: {string}
│       ├── photoURL: {string}
│       ├── role: 'user' or 'admin'
│       ├── uid: {string}
│       ├── likedPosts
│       │   ├── postId: {bool}
│       │
│       ├── saved
│           ├── postId: {bool}
│    
│ 
├── posts
│   ├── postId
│       ├── author: userHandle 
│       ├── categories
│       │   ├── 0: {string}
│       │   ├── 1: {string}
│       │   
│       │   
│       │   
│       ├── comments
│       │   ├── commentId: {string}
│       │       ├── author: userHandle 
│       │       ├── content: {string}
│       │       ├── createdOn: Date in UNIX format
│       │       ├── replies: 
│       │           ├── replyId: {string}
│       │               ├── author: userHandle
│       │               ├── content: {string}
│       │               ├── createdOn: Date in UNIX format
│       │        
│       ├── content: {string}
│       ├── createdOn: Date in UNIX format
│       ├── lastUpdate: Date in UNIX format
│       ├── likedBy: 
│       │   ├── userHandle: {bool}
│       │  
│       ├── savedBy
│       │   ├── userHandle: {bool}
│       │   
│       ├── title:{string}
│
├── blocked-users
    ├── userHandle
        ├── reason: {string}

```
We have also utilized the Firebase storage to store the pictures that our users upload to posts or as profile pics

## Contributors 

### Web Group 4 Ilia, Slavena, Valentin
#### 2023 Alpha 49 JS