import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuModal = ({ closeModal, onSave, menu }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (menu) {
      setName(menu.name);
      setPrice(menu.price);
      setImage(menu.image);
    }
  }, [menu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: menu ? menu.id : Date.now(),
      name,
      price,
      image,
    });
    closeModal();
  };


  //로컬
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     // 이미지 업로드 로직을 여기에 구현하세요.
//     // 예를 들어, 이미지 URL을 setImage(imageUrl)로 설정할 수 있습니다.
//   };

//몽고 - fetch
//     const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
  
//     const formData = new FormData();
//     formData.append('file', file);
  
//     try {
//       const response = await fetch(`/api/uploadImage?filename=${file.name}`, {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (response.ok) {
//         const { fileId } = await response.json();
//         setImage(fileId);
//       } else {
//         console.error('Error uploading image:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };
  
// mongo-axios

const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await axios.post('/api/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('이미지 업로드 완료:', response.data);
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
    }
  };
  
  // 이미지 파일 선택 시 호출되는 이벤트 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    uploadImage(file);
  };
  

  return (
    <div>
      <h2>{menu ? 'Edit Menu' : 'Add Menu'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />
        <label>
          Image:
          <input type="file" onChange={handleImageUpload} />
        </label>
        <br />
        <button type="submit">{menu ? 'Update' : 'Add'}</button>
      </form>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};

export default MenuModal;
