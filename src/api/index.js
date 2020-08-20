import axios from 'axios';

export const baseUrl = 'https://hack.sandbox.instabase.com/api/v1/drives/mohit/ibsign/fs/Instabase%20Drive';
// export const baseUrl = 'https://localhost/api/v1/drives/tamba/my-repo/fs/Instabase%20Drive';

const config = {
  headers: {
    'Authorization': 'Bearer gaGwfRuI7iayiWI4Olsd2yGLhmRBni',
    // 'Authorization': 'Bearer ZLQ4OdxcdNbgISHMYcAgGlyBVkAnsL',
    'Instabase-API-Args': '{"type": "file", "mode": "w", "content_encoding": "base64"}',
    'Content-Type': 'application/json',
  }
}
export const getFile = () =>
  axios.get('https://localhost/tamba/my-repo/fs/Instabase%20Drive/paper.pdf?content-disposition=raw', config)
  // axios.get('https://hack.sandbox.instabase.com/mohit/ibsign/fs/Instabase%20Drive/Independent%20Contractor%20Agreement_2ndCopy.pdf?content-disposition=raw', config)

export const uploadFile = (fileContent, uploadURL) => {
  return axios.post(uploadURL, fileContent, config);
    // .then(response => {
    //   console.log(response)
    // })
}

    // .catch(error => console.log(error)
    // );

// export const createDocument = ({
//    doc_id,
//    recipients,
//    creator,
//   doc_path
// }) => {
//   axios.post(
//     `${rootUrl}/app/ibsign/v1/document/create`,
//     {
//       doc_id,
//       recipients,
//       creator,
//       doc_path
//     },
//     config
//   )
// }
//
// export const readDocuments = ({
//   doc_id, status, document
// }) => {
//   axios.get(
//     `${rootUrl}/app/ibsign/v1/document/get`,
//     {
//       doc_id,
//     },
//     config
//   )
// }
//
// export const updateDocument = ({
//    doc_id,
//    signed_by,
//    timestamp,
//    link_to_signed_pdf
//  }) => {
//   axios.post(
//     `${rootUrl}/developer/ibsign/document/sign`,
//     {
//       doc_id,
//       signed_by,
//       timestamp,
//       link_to_signed_pdf
//     },
//     config
//   )
// }
