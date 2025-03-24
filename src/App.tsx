import Header from "@components/Header";
import { PhotoGrid } from "@components/PhotoGrid";
import { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };
  return (
    <>
      <div className="app">
        <Header onSearch={handleSearch} />
        <PhotoGrid searchTerm={searchTerm} />
      </div>
    </>
  );
}

export default App;
