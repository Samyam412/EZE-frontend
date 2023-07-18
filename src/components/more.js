import React, { useState, useEffect } from 'react';
import '../style/more.css';
import { useLocation } from 'react-router-dom';
import Product from './product';

const More = () => {
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    setSelectedSection(location.pathname.replace('/', '') || 'popular');
  }, [location.pathname]);

  return (
    <>
      <nav className="more-nav">
        <button
          className={`more-link ${selectedSection === 'popular' ? 'active' : ''}`}
          onClick={() => setSelectedSection('popular')}
        >
          Most Popular
        </button>
        <button
          className={`more-link ${selectedSection === 'offers' ? 'active' : ''}`}
          onClick={() => setSelectedSection('offers')}
        >
          Exciting offers for you
        </button>
        <button
          className={`more-link ${selectedSection === 'new' ? 'active' : ''}`}
          onClick={() => setSelectedSection('new')}
        >
          Newest
        </button>
        <button
          className={`more-link ${selectedSection === 'high' ? 'active' : ''}`}
          onClick={() => setSelectedSection('high')}
        >
          Highly rated
        </button>
      </nav>
      <hr className='more-hr'/>

      {/* Render the items based on the selected section */}
      {selectedSection === 'popular' && (
        <div className='popularp'>
          <Product productId={'1'} />
          <Product productId={'8'} />
          <Product productId={'7'} />
          <Product productId={'5'} />
        </div>
      )}
      {selectedSection === 'offers' && (
        <div className='popularp'>
          <Product productId={'5'} />
          <Product productId={'6'} />
          <Product productId={'8'} />
          <Product productId={'3'} />
        </div>
      )}
      {selectedSection === 'new' && (
        <div className='popularp'>
          <Product productId={'1'} />
          <Product productId={'2'} />
          <Product productId={'5'} />
          <Product productId={'6'} />
        </div>
      )}
      {selectedSection === 'high' && (
        <div className='popularp'>
          <Product productId={'6'} />
          <Product productId={'8'} />
          <Product productId={'4'} />
          <Product productId={'9'} />
        </div>
      )}
    </>
  );
};

export default More;
