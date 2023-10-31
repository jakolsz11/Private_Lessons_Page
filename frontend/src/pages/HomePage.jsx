import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomePage = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col sm={1}></Col>
      <Col sm={3}>
        <Image src="/images/IMG_5609.PNG" rounded fluid />
      </Col>
      <Col sm={7}>
        <Row>
        <h3>Jakub Olszanecki</h3>
        <h5>Math Teacher</h5>
          <p>
          I am a passionate professional in the field of mathematics. With 1 year of experience, I am dedicated to learning and explaining new concepts in the easiest possible way. I believe that together, we can elevate your math skills to the next level. If you want to make math easier, please contact me.
          </p>
        </Row>
        <Row>
          <b>Contakt me:</b>
          <p className="mb-0"><b>Email: </b>olszanecki.jakub@gmail.com</p>
          <p className="mb-0"><b>Phone: </b>535 078 734</p>
          <p><b>Facebook: </b><a href="https://www.facebook.com/kuba.olszanecki/" target="_blank">Kuba Olszanecki</a></p>
          <p>
            <LinkContainer to="/user/sign" >
              <Button variant="warning">
                Sign up NOW
              </Button>
            </LinkContainer>
                      
          </p>
          
        </Row>
      </Col>
      <Col sm={1}></Col>
      </Row>
      
    </Container>
  )
}

export default HomePage;