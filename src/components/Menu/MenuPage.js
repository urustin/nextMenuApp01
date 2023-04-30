import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(search.toLowerCase())
  ).filter((menu) => category === 'all' || menu.category === category);

  return (
    <div>
      <h1>Menu</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="all">All Categories</option>
        {/* Add other categories as options here */}
      </select>
      <div>
        {filteredMenus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
