module.exports = ({ env }) => ({
  upload: {
    provider: "google-cloud-storage",
    providerOptions: {
      serviceAccount: env.json("GCS_SERVICE_ACCOUNT"),
      bucketName: env("GCS_BUCKET_NAME"),
      baseUrl: env("GCS_BASE_URL"),
    },
    breakpoints: {},
  },
  //...
});
