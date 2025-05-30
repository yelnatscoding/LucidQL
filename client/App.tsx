import React, { useState } from 'react';
import LinkContainer from './components/link-popup/LinkContainer';
import TopNav from './components/navbar/TopNav';
import CodeBox from './components/codeBox/codebox';
import ForceGraph from './forceGraph/ForceGraph';
import Footer from './components/footer/Footer';
import Sidebar from './components/sidebar/Sidebar';
import './styles.css';

// --- Types ---
interface HistoryEntry {
  table: Record<string, unknown>;
  schema: string;
}

export interface AppState {
  link: string;
  modal: boolean;
  schema: string;
  tables: Record<string, unknown>;
  tableModified: boolean;
  history: HistoryEntry[];
}

// --- Annotation Component ---
function Annotation({ handleUndo }: { handleUndo: () => void }) {
  return (
    <div className="annotation">
      <h6 style={{ color: "orange", fontWeight: "bolder" }}> ⟶ Foreign Key To (Postgres)</h6>
      <h6 style={{ color: "#767c77", fontWeight: "bolder" }}> ⎯⎯⎯⎯⎯ Able To Query Each Other (GraphQL)</h6>
      <button className="form-control btn btn-light" onClick={handleUndo}>⎌ UNDO</button>
    </div>
  );
}

// --- Main App Component ---
const App: React.FC = () => {
  const [data, setData] = useState<AppState>({
    link: '',
    modal: true,
    schema: '',
    tables: {},
    tableModified: false,
    history: [],
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const showModal = () => {
    setData({ ...data, modal: true });
  };

  const handleUndo = () => {
    if (data.history.length > 0) {
      const newHistory = [...data.history];
      const prevData = newHistory.pop();
      if (prevData) {
        setData({
          ...data,
          schema: prevData.schema,
          tables: prevData.table,
          history: newHistory,
        });
      }
    }
  };

  const openSidebar = () => setSidebarOpen(true);

  return (
    <div>
      <div className="app-flex-container">
        {sidebarOpen && (
          <Sidebar
            data={data}
            setData={setData}
            isOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />
        )}
        <div className="app-main-content">
          <TopNav showModal={showModal} openSidebar={openSidebar} />
          <LinkContainer data={data} setData={setData} />
          <div className="page-content-wrapper">
            <div className="main-content-row">
              <ForceGraph data={data} setData={setData} />
              <CodeBox data={data} setData={setData} />
            </div>
            <Footer data={data} setData={setData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
