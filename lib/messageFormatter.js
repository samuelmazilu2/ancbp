 const formatFormForEmail = ({
    name,
    phone,
    email,
    message,
    location,
    city,
    county,
    uuid,
    files,
    baseUrl
  }) => {
      return `
      A fost trimisa o noua sesizare: \n
      Nume: ${name} \n
      Telefon: ${phone} \n
      Email: ${email} \n
      Mesaj: ${message} \n
      Location (GPS): ${location} \n
      Oras: ${city} \n
      County: ${county} \n
      uuid: ${uuid} \n
      Files: ${formatFiles(files, baseUrl)}
      `

}

const formatFiles = (files, url) => {
  let output = '';
  for(const file of files){
     output += '\n <br/> ' + generateDownloadUrl(url, file.uuid, file.name);
  }
  return output;
}
const generateDownloadUrl = (baseUrl, uuid, filename) => {
  
  const url =  `${baseUrl}/download/${uuid}`;
  return `<a href="${url}" target="_blank">${filename}</a>`;
}
module.exports = {formatFormForEmail}