export const Upload = async ({ images: image, setIsSaving }) => {
  var imageUrlList = [];
  const files = image;
  let apiUrl = 'https://api.cloudinary.com/v1_1/ricoapp/image/upload';
  if (files.length !== 0) {
    for (const single_file of files) {
      const dd = await getBase64(single_file);
      let data = {
        file: dd,
        upload_preset: 'ricoapp',
      };

      await fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async (r) => {
          let data = await r.json();
          imageUrlList.push({
            uri: data.secure_url,
            publicId: data.public_id,
            base64: '',
          });
          return data.secure_url;
        })
        .catch((err) => {
          setIsSaving(false);
          alert('Error Saving Picture');
        });
    }
  }

  return imageUrlList;
};

function getBase64(file) {
  return new Promise((resolve) => {
    let baseURL = '';
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
}
