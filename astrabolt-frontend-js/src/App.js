import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { NavbarHome } from './components/NavbarHome';
import { Container, Row, Col, SplitButton, Dropdown } from 'react-bootstrap';
import { HomeCards,FeaturedCards, SearchCards } from './components/ProductRetrieval';
import { Reviews } from './components/Reviews';

function App() {
  const [categoryValue, setCategoryValue] = useState('{}');
  const [limitValue, setLimitValue] = useState('40');
  const [showPageValue, setShowPageValue] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (eventKey) => {
    setCategoryValue(eventKey);
  };

  const handleLimitChange = (eventKey) => {
    setLimitValue(eventKey);
  };

  const handleSearch = (showPage) => {
    setShowPageValue(showPage);
  }

  return (

    <Container>
      <NavbarHome onDropdownChange={handleCategoryChange} onSearch={handleSearch} />
      <Row className="mb-4">
        <Col className="col-12 d-flex justify-content-end align-items-center">
          <SplitButton variant="secondary" title="Results" size="sm" onSelect={handleLimitChange}>
            <Dropdown.Item eventKey="20" key="20" active={limitValue === '20'}>20</Dropdown.Item>
            <Dropdown.Item eventKey="40" key="40" active={limitValue === '40'}>40</Dropdown.Item>
            <Dropdown.Item eventKey="80" key="80" active={limitValue === '80'}>80</Dropdown.Item>
            <Dropdown.Item eventKey="100" key="100" active={limitValue === '100'}>100</Dropdown.Item>
          </SplitButton>
          </Col>
      </Row>
      {showPageValue === "home" && <HomeCards page={handleSearch} categoryFilter={categoryValue} limit={limitValue}/>}
      {showPageValue === "featured" && <FeaturedCards categoryFilter={categoryValue} limit={limitValue}/>}
      {showPageValue === "reviews" && <Reviews categoryFilter={categoryValue} limit={limitValue}/>}
      {!["home","featured", "reviews"].includes(showPageValue) && <SearchCards vectorSearchQuery={showPageValue} categoryFilter={categoryValue} limit={limitValue}/>}
    </Container>
  );
}

export default App;