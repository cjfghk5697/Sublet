import React, { useState, useRef } from 'react';

const ListToggle = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const buttonRef = useRef(null);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const toggleList = () => {
    setIsListVisible(!isListVisible);
  };

  return (
    <div>
      <button ref={buttonRef} onClick={toggleList}>Toggle List</button>
      {isListVisible && (
        <ul className="floating-list" style={{
          position: 'absolute',
          top: `${buttonRef.current ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight : 0}px`,
          left: `${buttonRef.current ? buttonRef.current.offsetLeft : 0}px`
        }}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListToggle;
