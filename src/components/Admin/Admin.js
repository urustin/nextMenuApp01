import React, { useState, useEffect } from 'react';
import MenuModal from './MenuModal';
import axios from "axios";

const Admin = () => {
  const [menus, setMenus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMenu, setEditMenu] = useState(null);

  useEffect(() => {
    // 여기서 메뉴 목록을 불러오는 API 호출을 수행합니다.
    // 예를 들어, setMenus(mockMenuData)와 같이 설정할 수 있습니다.
  }, []);

//   const handleAddMenu = (newMenu) => {
//     setMenus([...menus, newMenu]);
//   };
  async function handleAddMenu(newMenu) {
    await setMenus([...menus, newMenu]);
    // console.log(menus);
    // console.log(newMenu);
    const id = menus.id;
    const name = menus.name;
    const price = menus.price;
  
    try {
      await axios.post("/api/addMenu", newMenu);
      alert("Menu added successfully");
      // 이후에 메뉴 목록을 업데이트하거나 다른 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error("Error adding menu:", error);
      // console.log({id,name,price})
      alert("Failed to add menu");
    }
  }

  const handleUpdateMenu = (updatedMenu) => {
    setMenus(menus.map((menu) => (menu.id === updatedMenu.id ? updatedMenu : menu)));
  };

  const handleDeleteMenu = (menuId) => {
    setMenus(menus.filter((menu) => menu.id !== menuId));
  };

  const handleEditMenu = (menu) => {
    setEditMenu(menu);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMenu(null);
  };

  return (
    <div>
      <h1>Admin</h1>
      <button onClick={() => setShowModal(true)}>Add Menu</button>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            {menu.name} - {menu.price}
            <button onClick={() => handleEditMenu(menu)}>Edit</button>
            <button onClick={() => handleDeleteMenu(menu.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showModal && (
        <MenuModal
          closeModal={closeModal}
          onSave={editMenu ? handleUpdateMenu : handleAddMenu}
          menu={editMenu}
        />
      )}
    </div>
  );
};

export default Admin;
