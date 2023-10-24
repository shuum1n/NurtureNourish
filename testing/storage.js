// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

const PROJECT_ID = "promising-rock-399509"
// Creates a client using Application Default Credentials
const storage = new Storage({
    projectId: PROJECT_ID
});

// Creates a client from a Google service account key
// const storage = new Storage({keyFilename: 'key.json'});

/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// The ID of your GCS bucket
const bucketName = 'test-hacktiv-bucket';

async function createBucket()
{
    // Creates the new bucket
    await storage.createBucket(bucketName);
    console.log(`Bucket ${bucketName} created.`);
}

createBucket().catch(console.error);