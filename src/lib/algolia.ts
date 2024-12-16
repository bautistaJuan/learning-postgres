import * as dotenv from "dotenv";
import { algoliasearch } from "algoliasearch";
dotenv.config();

const appID = process.env.ALGOLIA_APP_ID;
const apiKeySearch = process.env.ALGOLIA_API_KEY_SEARCH;
const apiKeyWrite = process.env.ALGOLIA_API_KEY_WRITE;

// async function init() {
const clientSearch = algoliasearch(appID, apiKeySearch);
const clientWrite = algoliasearch(appID, apiKeyWrite);
// const indexName = "products";
// const newProduct = { objectID: "product-1", name: "test product" };

export { clientWrite, clientSearch };
// Add record to an index
// const { taskID } = await client.saveObject({
//   indexName,
//   body: {
//     objectID: "product-2",
//     name: "test product 2",
//   },
// });

// // // Wait until indexing is done
// const taskComplete = await client.waitForTask({
//   indexName,
//   taskID,
// });

// console.log(taskComplete);

// Search for "test"
// const { results } = await clientSearch.search({
//   requests: [
//     {
//       indexName,
//       query: "test",
//     },
//   ],
// });
// console.log("RESULTS", results);
// results.forEach(result => {
//   console.log("IN FOREACH", result);
// });
// }
// init();
// export default init;
