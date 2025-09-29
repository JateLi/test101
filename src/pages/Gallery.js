import React, { useState } from 'react';
import './Gallery.css';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  // 模拟图片数据
  const images = [
    { id: 1, src: 'https://picsum.photos/300/200?random=1', category: 'nature', title: '自然风光' },
    { id: 2, src: 'https://picsum.photos/300/200?random=2', category: 'city', title: '城市建筑' },
    { id: 3, src: 'https://picsum.photos/300/200?random=3', category: 'nature', title: '山川河流' },
    { id: 4, src: 'https://picsum.photos/300/200?random=4', category: 'people', title: '人物摄影' },
    { id: 5, src: 'https://picsum.photos/300/200?random=5', category: 'city', title: '都市夜景' },
    { id: 6, src: 'https://picsum.photos/300/200?random=6', category: 'nature', title: '森林小径' },
    { id: 7, src: 'https://picsum.photos/300/200?random=7', category: 'people', title: '街头人像' },
    { id: 8, src: 'https://picsum.photos/300/200?random=8', category: 'city', title: '现代建筑' },
    { id: 9, src: 'https://picsum.photos/300/200?random=9', category: 'nature', title: '海边日落' },
  ];

  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => img.category === filter);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>🖼️ 图片库</h1>
        <p>精美图片展示</p>
      </div>

      <div className="gallery-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          全部
        </button>
        <button
          className={`filter-btn ${filter === 'nature' ? 'active' : ''}`}
          onClick={() => setFilter('nature')}
        >
          自然
        </button>
        <button
          className={`filter-btn ${filter === 'city' ? 'active' : ''}`}
          onClick={() => setFilter('city')}
        >
          城市
        </button>
        <button
          className={`filter-btn ${filter === 'people' ? 'active' : ''}`}
          onClick={() => setFilter('people')}
        >
          人物
        </button>
      </div>

      <div className="gallery-grid">
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => openModal(image)}
          >
            <img src={image.src} alt={image.title} />
            <div className="gallery-overlay">
              <h3>{image.title}</h3>
              <p>点击查看大图</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={selectedImage.src} alt={selectedImage.title} />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>分类: {selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;