import { useState, useRef, useEffect } from "react";
import "./App.css"; 

export default function DropdownWithImages() {
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const dropdownRef = useRef(null); 

  const options = [
    { label: "Option 1", image: "/img1.jpeg" },
    { label: "Option 2", image: "/img2.jpeg" },
    { label: "Option 3", image: "/img3.jpeg" },
  ];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (image) => {
    setSelectedImage(image);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedImage(null); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
   <div className="main-container">
     <div className="dropdown-container" ref={dropdownRef}>
     <h1>Dropdown Buttton</h1>
     <button className="dropdown-button" onClick={toggleDropdown}>
       {isOpen ? "Close" : "Open"} Dropdown
     </button>

     {isOpen && (
       <ul className="dropdown-menu">
         {options.map((option, index) => (
           <li key={index} onClick={() => handleSelect(option.image)}>
             {option.label}
           </li>
         ))}
       </ul>
     )}
   {selectedImage && (
       <div className="image-container">
         <h3>Selected Image:</h3>
         <img src={selectedImage} alt="Selected" className="selected-image" />
       </div>
     )}
   </div>
   </div>
  );
}
