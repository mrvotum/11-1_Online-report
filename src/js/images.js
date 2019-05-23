document.querySelector('[data-id=upload-form]').addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://localhost:7075');
  // TODO: subscribe to response

  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      const img = document.createElement('img');
      img.src = `http://localhost:7075/${xhr.response}`;
      console.log(xhr.response);
      document.body.appendChild(img);
    }
  });

  xhr.send(formData);
});

// {/* <form data-id="upload-form">
//   <input type="file" name="file" accept="image/*">
//   <input type="text" name="name" value="My Photo">
//   <button>Upload</button>
// </form> */}