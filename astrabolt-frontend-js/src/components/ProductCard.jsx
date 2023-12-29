import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { StarFill, StarHalf, Star } from 'react-bootstrap-icons'

export function ProductCard({ data, page }) {
  const maxDescriptionLength = 100;
  const ellipsis = '...';
  const sanitizedDescription = data.description.replace(new RegExp(data.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), '')
    .slice(0, maxDescriptionLength - ellipsis.length) + ellipsis;
  const placeholderImage =
    'https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'

  function handleImageError(ev) {
    ev.target.src = placeholderImage;
  }

  return (
    <Card className="h-100 shadow-sm bg-white rounded">
      <Card.Img variant="top" src={data.image} onError={handleImageError} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Row className='mb-2'>
          <Col xs="6">
            <StarFill size={20} color="#f2a842" />
            <StarFill size={20} color="#f2a842" />
            <StarFill size={20} color="#f2a842" />
            <StarHalf size={20} color="#f2a842" />
            <Star size={20} color="#f2a842" />
          </Col>
          <Col xs="3">
            <a href="#">{(Math.floor(Math.random() * 4951) + 50).toLocaleString('en-US', { useGrouping: true })}</a>
          </Col>
        </Row>
        <Card.Text>
          {sanitizedDescription}
        </Card.Text>
        <h1 className="card-title pricing-card-title">
          ${data.price}
        </h1>
      </Card.Body>
      <Card.Footer>
        <Button variant="warning">Add to cart</Button>
      </Card.Footer>
    </Card>
  );
}