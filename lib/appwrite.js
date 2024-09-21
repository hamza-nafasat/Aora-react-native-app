import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

const appWriteConfig = {
  endPoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "66ee519e00140611b334",
  dataBaseId: "66ee543400000192638a",
  userCollectionId: "66ee546f0012ff6fe6d0",
  videoCollectionId: "66ee548b00337a25c8dc",
  storageId: "66ee5690003a9aef0be6",
};

// Init your React Native SDK
const client = new Client();
client
  .setEndpoint(appWriteConfig.endPoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

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
    const newUser = await dataBases.createDocument(
      appWriteConfig.dataBaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        avatar: avatarUrl,
        username,
        email,
      }
    );
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

// get user function
// --------------------
const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error("error while getting current account");
    const currentUser = await dataBases.listDocuments(
      appWriteConfig.dataBaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error("error while getting current user");
    return currentUser.documents[0];
  } catch (error) {
    console.log("error while getting user", error);
    throw new Error(error);
  }
};

export { appWriteConfig, createUser, signInUser, getCurrentUser };
