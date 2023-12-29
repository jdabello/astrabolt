import React, { useState, useRef } from 'react';
import App from '../App'
import { Button, Container, Form, Nav, Navbar, Dropdown, InputGroup } from 'react-bootstrap';
import { Search, CardImage, MicFill } from 'react-bootstrap-icons';
import categories from '../data/categories';
import { Dictaphone } from './Dictaphone';

export function NavbarHome({ onDropdownChange, onSearch }) {
  const [categoryValue, setCategoryValue] = useState('{}');
  const [searchValue, setSearchValue] = useState('');
  const fileInputRef = useRef(null);

  const handleCategoryChange = (eventKey, event) => {
    setCategoryValue(eventKey);
    onDropdownChange(eventKey); // Pass the value up to App
  };

  const handleSearch = () => {
    if (searchValue !== "") {
      onSearch(searchValue);
      setSearchValue("");
    } else {
      onSearch("home");
    }
  }
  function handleImageSearch() {
    fileInputRef.current.click(); // Open file dialog

    // Add code for image acceptance and processing:
    const fileInput = fileInputRef.current;
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result; // Base64 encoded image data
        console.log(imageData);
        onSearch(imageData);
      };
      reader.readAsDataURL(file);
    });
  }
  function goHome(){
    setCategoryValue("{}");
    onDropdownChange("{}");
    onSearch("home");
  }
  function showFeatured(){
    setCategoryValue("{}");
    onDropdownChange("{}");
    onSearch("featured");
  }
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" onClick={goHome}>Astrabolt</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#" onClick={showFeatured}>Featured</Nav.Link>

          </Nav>
          <Container className="d-flex flex-grow-1">
            <Form className="mr-2 my-auto w-100 d-inline-block order-1">
              <InputGroup>
                <Dropdown onSelect={handleCategoryChange}>
                  <Dropdown.Toggle variant="outline-success" id="dropdown-basic">
                    All
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {categories.map(category => (
                      <Dropdown.Item eventKey={category.id} key={category.id}>
                        {category.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="border border-right-0"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
                <Button variant="outline-success" className="border border-left-0" type="button" onClick={handleSearch}>
                  <Search size={16} />
                </Button>
                <Button variant="outline-success" className="border border-left-0" type="button" onClick={handleImageSearch}>
                  <CardImage size={16} />
                </Button>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
                <Dictaphone transcriptOutput={setSearchValue}/>
              </InputGroup>
            </Form>
          </Container>

        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default NavbarHome;