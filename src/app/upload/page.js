"use client"
import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    console.log(data.data)
    setImageUrl(`data:image/jpeg;base64,${data.data}`);

    // if (data.status === 'success') {
    //   setImageUrl(`${data.data}`);
    // } else {
    //   console.error(data.data);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
     
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" width={500} height={500} />
        </div>
      )}
    </div>
  );
}
