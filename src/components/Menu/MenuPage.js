import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from './MenuItem';

const MenuPage = () => {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    console.time("fetchMenu");
    const fetchMenus = async () => {
      try {
        const startTime = Date.now()
        const response = await axios.get('/api/menus');
        // console.log(response.data[1]);
        let a = [...response.data[1]];
        // console.log(a);
        for(let i of a){
          // console.log(i);
          console.log(i.message + (i.timestamp - startTime));
        }
        setMenus(response.data[0]);
        const endTime = Date.now(); // 요청 종료 시간 기록
        const elapsedTime = endTime - startTime; // 경과 시간 계산
        console.log(`Request processing time: ${elapsedTime} ms`);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    fetchMenus();
    // console.timeLog("fetchMenu");
    console.timeEnd("fetchMenu");
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
