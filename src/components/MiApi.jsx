import { useState, useEffect } from 'react';
import Buscador from './Buscador';
import 'bootstrap/dist/css/bootstrap.min.css';


const MiApi = () => {
  const [amiibos, setAmiibos] = useState([]); //lista de amiibos
  const [filteredAmiibos, setFilteredAmiibos] = useState([]); // amiibos filtrados
  const [sortedDirection, setSortedDirection] = useState('asc'); //dirección de ordenamiento
  const [displayedAmiibos, setDisplayedAmiibos] = useState([]); // amiibos que se muestran actualmente

  const fetchAmiibos = async () => { //función para llamar a la api y obtener la lista de amiibos
    try {
      const response = await fetch('https://www.amiiboapi.com/api/amiibo/');
      const data = await response.json();
      setAmiibos(data.amiibo);
      setFilteredAmiibos(data.amiibo); // inicializar con todos los amiibos
      setDisplayedAmiibos(data.amiibo.slice(0, 42)); // mostrar los primeros 42 amiibos por defecto
    } catch (error) {
      console.error('Error fetching amiibos:', error);
    }
  };

  useEffect(() => { //ejecución de la función fetchAmiibos, se ejecuta una vez, cuando el componente se monta
    fetchAmiibos();
  }, []);

  const handleSearch = (searchSeries) => { //fución para filtrar los amiibos por videojuego
    let filteredResults = amiibos.filter((amiibo) => {
      const seriesMatch = amiibo.amiiboSeries.toLowerCase().includes(searchSeries.toLowerCase());
      return seriesMatch;
    });
    setFilteredAmiibos(filteredResults);
    setDisplayedAmiibos(filteredResults.slice(0, 42)); // mostrar los primeros 42 resultados después de la búsqueda
  };

  const toggleSortDirection = () => { //función para cambiar la dirección de ordenamiento entre ascendente y descendente.
    setSortedDirection(sortedDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => { //ordena los amiibos filtrados cuando cambia la dirección de ordenamiento
    const sortedFilteredAmiibos = [...filteredAmiibos].sort((a, b) => {
      if (sortedDirection === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setDisplayedAmiibos(sortedFilteredAmiibos.slice(0, 42)); // mostrar los primeros 42 amiibos después de ordenar
  }, [filteredAmiibos, sortedDirection]);

  const amiibosPerPage = 42; //se calcula el número total de páginas basado en la cantidad de amiibos filtrados
  const totalPages = Math.ceil(filteredAmiibos.length / amiibosPerPage);

  const handlePageChange = (page) => { //cambia la página actual de amiibos que se muestran
    const startIndex = (page - 1) * amiibosPerPage; //da el índice del primer amiibo en pantalla
    const endIndex = startIndex + amiibosPerPage; //da el índice del último amiibo en pantalla
    setDisplayedAmiibos(filteredAmiibos.slice(startIndex, endIndex));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
            <div className='d-flex justify-content-between aling-items-center'>
                <Buscador onSearch={handleSearch} /> 
                <button className="btn btn-light my-3" onClick={toggleSortDirection}>
                Ordenar {sortedDirection === 'asc' ? 'Z-A' : 'A-Z'}
                </button>
            </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {displayedAmiibos.map((amiibo, index) => (
              <div className="col" key={index}>
                <div className="card h-100">
                  <img src={amiibo.image} className="card-img-top" alt={amiibo.name} />
                  <div className="card-body">
                    <h5 className="card-title">{amiibo.name}</h5>
                    <p className="card-text">{amiibo.amiiboSeries}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li className="page-item" key={i + 1}>
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiApi;



