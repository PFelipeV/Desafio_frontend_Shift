import React, { useState, useEffect } from 'react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('business');
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  
  const apiKey = '957560e55f1a44849829e1abd234a826';

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setNews(data.articles);
      })
      .catch(error => console.error('Error fetching news:', error));
  }, [selectedCategory]);

  const handleOpenModal = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontFamily: 'Arial, sans-serif' }}>Noticias por categoría</h1> 
      
      <select 
        id="category" 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)} 
        style={{ width: '300px', padding: '10px', fontFamily: 'Arial, sans-serif', color: 'gray' }} 
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <div className="news-container" style={gridContainerStyle}>
        {news && news.map((article, index) => (
          <NewsCard 
            key={index}
            title={article.title} 
            author={article.author} 
            imageUrl={article.urlToImage} 
            content={article.content} 
            onOpenModal={() => handleOpenModal(article)}
          />
        ))}
      </div>

      {selectedArticle && (
        <Modal article={selectedArticle} onClose={handleCloseModal} />
      )}
    </div>
  );
}

const NewsCard = ({ title, author, imageUrl, onOpenModal }) => {
  return (
    <div className="news-card" style={cardStyle}>
      <img src={imageUrl} alt={title} style={imageStyle} />
      <h3>{title}</h3>
      <p><strong>Author:</strong> {author || 'Desconocido'}</p>
      <button onClick={onOpenModal}>
        Ver noticia completa
      </button>
    </div>
  );
};


const Modal = ({ article, onClose }) => {
  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>{article.title}</h2>
        <img src={article.urlToImage} alt={article.title} style={imageStyle} />
        <p>{article.content}</p>
        <button onClick={onClose} style={closeButtonStyle}>
          Cerrar
        </button>
      </div>
    </div>
  );
};


const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '16px',
  padding: '20px',
};

const cardStyle = {
  border: '1px solid #ddd',
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'left',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  width: '100%',
  height: '200px', 
  objectFit: 'cover',
  borderRadius: '8px',
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '500px',
  width: '100%',
  textAlign: 'center',
};

const closeButtonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default App;
