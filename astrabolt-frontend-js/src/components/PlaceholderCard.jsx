import Button from 'react-bootstrap/Button';
import { Card, Placeholder, PlaceholderButton } from 'react-bootstrap';
import { Star } from 'react-bootstrap-icons'

export function PlaceholderCard({ data }) {
    const placeholderImage =
        'images/placeholder_img.jpg'

    return (
        <Card className="h-100 shadow-sm bg-white rounded">
            <Card.Img variant="top" src={placeholderImage} />
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={12} />
                </Placeholder>
                <Star size={20} color="#f2a842" />
                <Star size={20} color="#f2a842" />
                <Star size={20} color="#f2a842" />
                <Star size={20} color="#f2a842" />
                <Star size={20} color="#f2a842" />
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={4} />
                </Placeholder>
            </Card.Body>
            <Card.Footer>
                <PlaceholderButton variant="warning" xs={6} />
            </Card.Footer>
        </Card>
    );
}