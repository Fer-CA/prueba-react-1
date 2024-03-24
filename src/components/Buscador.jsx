import { useState } from 'react';


const Buscador = ({ onSearch }) => {
  const [searchSeries, setSearchSeries] = useState('');

  const handleSearch = () => {
    onSearch(searchSeries);
    setSearchSeries('');
  };

  return (
    <div className="search-container mt-3">
      <input
        type="text"
        placeholder="Buscar por juego "
        value={searchSeries}
        onChange={(e) => setSearchSeries(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}

export default Buscador;

