const https = require("https");

async function getVersionOfScriptionAPI() {
  return new Promise((resolve, reject) => {
    https
      .get("https://registry.npmjs.org/@minecraft/server", (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData["dist-tags"].latest);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// (async () => {
//   try {
//     const version = await getVersionOfScriptionAPI();
//     console.log(version);
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// })();
module.exports = getVersionOfScriptionAPI;
