import React from 'react';
import MenuItem from './MenuItem';

const MenuList = ({ menuItems }) => {
  return (
    <div>
      <h2>Menu List</h2>
      {menuItems.map((item) => (
        <MenuItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;
