 const formatFormForEmail = ({
    name,
    phone,
    email,
    message,
    location,
    city,
    county,
    uuid
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
      `

}

module.exports = {formatFormForEmail}