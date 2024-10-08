import React, { useState, useEffect } from 'react';
import { Book, FolderPlus, FilePlus, BookOpen } from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState('library');

  const navItems = [
    { id: 'library', label: 'My Library', icon: Book },
    { id: 'collection', label: 'Add Collection', icon: FolderPlus },
    { id: 'items', label: 'Add Items', icon: FilePlus },
  ];

  useEffect(() => {
    const main = document.querySelector('main');
    if (main) {
      main.style.marginLeft = isExpanded ? '256px' : '64px';
      main.style.transition = 'margin-left 300ms';
    }
  }, [isExpanded]);

  return (
    <nav 
      className={`bg-gradient-to-b from-orange-500 to-orange-600 h-screen fixed left-0 top-0 flex flex-col items-start shadow-lg transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="w-full flex items-center px-4 py-6">
        <BookOpen className="w-8 h-8 text-white" />
        <span className={`text-white font-bold text-xl ml-4 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>ShelfLife</span>
      </div>

      <div className="w-full mt-6">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`w-full py-3 px-4 flex items-center text-gray-200 hover:bg-orange-300 transition-all duration-200 ${
              activeItem === item.id ? 'bg-orange-400 border-r-4 border-white' : ''
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            <item.icon size={20} className="transition-all duration-300 min-w-[20px]" />
            <span className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>{item.label}</span>
          </a>
        ))}
      </div>

      <div className="mt-auto w-full px-4 pb-6">
        <div className="bg-orange-400 rounded-lg p-4 text-white">
          <h3 className={`font-semibold mb-2 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>Need Help?</h3>
          <p className={`text-sm transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>Check our FAQ or contact support for assistance.</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;