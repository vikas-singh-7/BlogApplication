import confg from "../confg/confg.js";

import { Client, Databases, Query, ID, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(confg.appWriteUrl)
      .setProject(confg.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // post kese bnauga ? create document post methods

  async createPost({ title, slug, content, featuredimage, status, userId }) {
    try {
      return await this.databases.createDocument(
        confg.appWriteDatabaseId,
        confg.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        confg.appWriteDatabaseId,
        confg.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        confg.appWriteDatabaseId,
        confg.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        confg.appWriteDatabaseId,
        confg.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        confg.appWriteDatabaseId,
        confg.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // file upload method

  async uplaodFile(file) {
    try {
      return await this.bucket.createFile(
        confg.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(confg.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(confg.appWriteCollectionId, fileId);
  }

  getFileDownload(fileId){

    return this.bucket.getFileDownload(confg.appWriteBucketId,
        fileId)

  }
}

const service = new Service();

export default service;
