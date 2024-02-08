// import env from '../../env';

// export const createQueryInfo = (queryParams: {
//   bbox: string;
//   outputFormat: string;
//   timeOutInSeconds: number;
//   filters?: Array<string>;
// }) => {
//   if (!queryParams.bbox) {
//     throw new Error(`
//           ¡¡¡¡ NEED PASS BOUNDARY BOX LIMITS IF YOU WANT USE QUERY WITH BOUNDARIES BOX !!!!
//           ==============================================================================
//           Pass value with next format:
//           <latitude_south_west>,<longitude_south_west>,<latitude_north_east>,<longitude_north_east>

//           For Example:
//           43.16540434728322,-2.4239873886108403,43.18261784109349,-2.401371002197266
//           `);
//   }

//   const queryTimeLimit = queryParams.timeOutInSeconds || 50;

//   const outputDataFormat = queryParams.outputFormat || env.OUTPUT_FORMAT.JSON;

//   // TODO add query string with filters dinamically
//   const overpassQueryHead = `
//       [bbox:${queryParams.bbox}][out:${outputDataFormat}][timeout:${queryTimeLimit}];
//       (`;

//   let filters = ``;
//   if (!queryParams.filters || !queryParams.filters.length) {
//     filters = `
//         node["amenity"="drinking_water"];
//         node["natural"="spring"];
//         node["drinking_water"="yes"];
//         `;
//   } else {
//     filters = `
//         `;
//     queryParams.filters.map((filter) => {
//       filters += `node[${filter}]; `;
//     });
//     filters += `
//         `;
//   }

//   const outBody = `
//       );
//       out body;
//       `;

//   return `
//       ${overpassQueryHead}${filters}${outBody}
//       `;
// };
