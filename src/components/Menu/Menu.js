// components/Menu/Menu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';

const Menu = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('/api/menus');
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <div>
        {menus.map((menu) => (
          <MenuItem key={menu._id} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
