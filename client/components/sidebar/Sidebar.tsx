import React from 'react';
import { writeToDummyServer } from '../footer/Footer';
import { AppState } from '../../App';


interface SidebarProps {
  data: AppState;
  setData: React.Dispatch<React.SetStateAction<AppState>>;
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ data, setData, isOpen, closeSidebar }) => {
  return (
    <div
      id="mySidebar"
      className="sidebar bg-dark"
      style={{
        zIndex: 3,
        width: isOpen ? 250 : 0,
        transition: 'width 0.3s',
        overflowX: 'hidden',
      }}
    >
      <a href="#" className="closebtn" onClick={closeSidebar}>
        ×
      </a>
      <a href="#">Dashboard</a>
      <a
        href="http://www.lucidql.com/playground"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => writeToDummyServer(data.schema, data.link)}
      >
        GraphQL Playground
      </a>
      <a
        href="https://github.com/oslabs-beta/LucidQL"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Source Code
      </a>
    </div>
  );
};

export default Sidebar;
