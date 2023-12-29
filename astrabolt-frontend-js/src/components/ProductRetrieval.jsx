import React, { useState, useEffect } from 'react';

import { Row, Col, Container, Stack, Badge } from 'react-bootstrap';
import { ProductCard } from './ProductCard';
import previousSearches from '../data/previousSearches';
import placeholders from '../data/placeholders'
import { PlaceholderCard } from './PlaceholderCard';

export function HomeCards({ page, categoryFilter, limit }) {

  const [message, setMessage] = useState('');
  if (categoryFilter !== '{}') {
    categoryFilter = `{"main_category.id": "${categoryFilter}"}`;
  }
  var url = `http://localhost:3001/productsFind/${categoryFilter}`
  url += `?limit=${limit}`;
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, [url, categoryFilter, limit]);
  if (Array.isArray(message)) {
    return (
        <Row>
          {message.map(data => (
            <Col xs={3} className="mb-5" key={`${data._id}`}>
              <ProductCard data={data} page={page}/>
            </Col>
          ))}
        </Row>
    );
  } else {
    return (
      <Row>
        {placeholders.map(data => (
          <Col xs={3} className="mb-5" key={`${data.id}`}>
            <PlaceholderCard data={data} />
          </Col>
        ))}
      </Row>
    )
  }

}

export function FeaturedCards({ categoryFilter, limit }) {

  const [message, setMessage] = useState('');
  if (categoryFilter !== '{}') {
    categoryFilter = `{"main_category.id": "${categoryFilter}"}`;
  }
  var url = `http://localhost:3001/featuredProducts`
  console.log(previousSearches)
  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filter: categoryFilter,
        limit: limit,
        pastSearches: previousSearches.map(item => item.text)
      })
    })
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, [url, categoryFilter, limit]);
  if (Array.isArray(message)) {
    return (
      <Container>
        <Row>
          <Col xs="3">
          Based on your previous searches
          </Col>
          <Col xs="9">
            <Stack direction="horizontal" gap={2} className='mb-3'>
            {previousSearches.map(search => (
              <Badge bg="secondary">{search.text}</Badge>
              ))}
            </Stack>
          </Col>
        </Row>

        <Row>
          {message.map(data => (
            <Col xs={3} className="mb-5" key={`${data._id}`}>
              <ProductCard data={data} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  } else {
    return (
      <Row>
        {placeholders.map(data => (
          <Col xs={3} className="mb-5" key={`${data.id}`}>
            <PlaceholderCard data={data} />
          </Col>
        ))}
      </Row>
    )
  }

}

export function SearchCards({ vectorSearchQuery, categoryFilter, limit }) {
  const [message, setMessage] = useState('');
  if (categoryFilter !== '{}') {
    categoryFilter = `{"main_category.id": "${categoryFilter}"}`;
  }
  var url = `http://localhost:3001/productsVectorFind`
  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: vectorSearchQuery,
        filter: categoryFilter,
        limit: limit
      })
    })
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, [url, categoryFilter, vectorSearchQuery, limit]);
  if (Array.isArray(message)) {
    return (
      <Row>
        {message.map(data => (
          <Col xs={3} className="mb-5" key={`${data._id}`}>
            <ProductCard data={data} />
          </Col>
        ))}
      </Row>
    );
  } else {
    return (
      <Row>
        {placeholders.map(data => (
          <Col xs={3} className="mb-5" key={`${data.id}`}>
            <PlaceholderCard data={data} />
          </Col>
        ))}
      </Row>
    )
  }

}
