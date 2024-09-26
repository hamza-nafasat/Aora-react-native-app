import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

const config = {
  endPoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "66ee519e00140611b334",
  databaseId: "66ee543400000192638a",
  userCollectionId: "66ee546f0012ff6fe6d0",
  videoCollectionId: "66ee548b00337a25c8dc",
  storageId: "66ee5690003a9aef0be6",
};
const { databaseId, endPoint, platform, projectId, storageId, userCollectionId, videoCollectionId } =
  config;

// Init your React Native SDK
const client = new Client();
client.setEndpoint(endPoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const dataBases = new Databases(client);

// create user function
// --------------------
const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw Error("error while creating user");
    const avatarUrl = avatars.getInitials(username);
    const session = await signInUser(email, password);
    const newUser = await dataBases.createDocument(databaseId, userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      avatar: avatarUrl,
      username,
      email,
    });
    if (!newUser) throw Error("error while creating user");
    else return newUser;
  } catch (error) {
    console.log("error while creating user", error);
    throw new Error(error);
  }
};

// sign in user function
// --------------------
const signInUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error("error while signing in user");
    else return session;
  } catch (error) {
    console.log("error while signing in user", error);
    throw new Error(error);
  }
};

// logout function
// --------------------
const logoutUser = async () => {
  try {
    const session = await account.deleteSession("current");
    if (!session) throw Error("error while logging out user");
    else return session;
  } catch (error) {
    console.log("error while logging out user", error);
    throw new Error(error);
  }
};

// get user function
// --------------------
const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error("error while getting current account");
    const currentUser = await dataBases.listDocuments(databaseId, userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);
    if (!currentUser) throw Error("error while getting current user");
    return currentUser.documents[0];
  } catch (error) {
    console.log("error while getting user", error);
    throw new Error(error);
  }
};

// fetch all posts
// --------------------
const fetchAllPosts = async () => {
  try {
    const posts = await dataBases.listDocuments(databaseId, videoCollectionId);
    return posts?.documents;
  } catch (error) {
    console.log("error while fetching all posts", error);
    throw new Error(error);
  }
};

// fetch latest posts
// --------------------
const fetchLatestPosts = async () => {
  try {
    const posts = await dataBases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return posts?.documents;
  } catch (error) {
    console.log("error while fetching latest posts", error);
    throw new Error(error);
  }
};

// search posts
// --------------------
const searchPosts = async ({ query = "" }) => {
  try {
    const posts = await dataBases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    return posts?.documents;
  } catch (error) {
    console.log("error while fetching latest posts", error);
    throw new Error(error);
  }
};

// my all posts
// --------------------
const getUserPosts = async (userId) => {
  try {
    const posts = await dataBases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
    ]);
    return posts?.documents;
  } catch (error) {
    console.log("error while fetching latest posts", error);
    throw new Error(error);
  }
};

export {
  config,
  createUser,
  signInUser,
  logoutUser,
  getCurrentUser,
  fetchAllPosts,
  fetchLatestPosts,
  searchPosts,
  getUserPosts,
};
