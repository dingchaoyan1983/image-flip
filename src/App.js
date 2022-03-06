import React, { useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const fileRef = useRef();
  const [imgUrl, setImgUrl] = useState();
  const convert = () => {
    const formData = new FormData();
    const file = fileRef.current?.files?.[0];
    // const file = fileRef.current
    formData.append('file', file);
    console.log(formData);
    axios({
      responseType: 'blob',
      method: "post",
      url: "/api/file",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
      const url = window.URL.createObjectURL(res.data);
      setImgUrl(url);
    });
  }
  return (
    <div className="App">
      <input type="file" ref={fileRef} />
      <button onClick={convert}>转换</button>
      <img src={imgUrl} style={{ width: 400 }}/>
    </div>
  );
}

export default App;
