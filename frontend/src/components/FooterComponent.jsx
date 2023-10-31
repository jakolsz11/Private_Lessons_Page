import { Container, Row, Col, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const pCss = {
  cursor: "pointer",
  marginBottom: "0",
}

const FooterComponent = () => {

  const userInfo = useSelector(state => state.userInfo);

  return (
    <footer>
      <Container fluid className="bg-warning text-center">
        <Container className="bg-warning text-dark text-center">
          <Row style={{ paddingTop: "1.5rem" }}>
            <Col ms={6}>

              {userInfo && userInfo.name ? (
                <>
                  <div style={{ padding: "0.25rem 12px" }}>
                    <LinkContainer className="link-to" style={pCss} to="/user">
                      <a href="#">{`${userInfo.name} ${userInfo.lastName} ${userInfo.isAdmin ? 'teacher' : 'student'}`}</a>
                    </LinkContainer>
                  </div>

                  {userInfo.isAdmin ? (
                    <>
                      <div style={{ padding: "0.15rem 12px" }}>
                        <LinkContainer className="link-to" style={pCss} to="/admin/classes">
                          <a href="#">My classes</a>
                        </LinkContainer>
                      </div>
                      <div style={{ padding: "0.15rem 12px" }}>
                        <LinkContainer className="link-to" style={pCss} to="/admin/dispositions">
                          <a href="#">My dispositions</a>
                        </LinkContainer>
                      </div>
                      <div style={{ padding: "0.15rem 12px" }}>
                        <LinkContainer className="link-to" style={pCss} to="/admin/users">
                          <a href="#">Users</a>
                        </LinkContainer>
                      </div>
                      <div style={{ padding: "0.15rem 12px" }}>
                        <LinkContainer className="link-to" style={pCss} to="/notifications">
                          <a href="#">
                            Notifications {" "}
                            {userInfo.notificationsCounter > 0 && (
                              <Badge pill bg="danger">
                                {userInfo.notificationsCounter}
                              </Badge>
                            )}
                          </a>
                        </LinkContainer>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ padding: "0.15rem 12px" }}>
                        <LinkContainer className="link-to" style={pCss} to="/user">
                          <a href="#">My profile</a>
                        </LinkContainer>
                      </div>
                      <div style={{ padding: "0.15rem 12px" }}>
                        <LinkContainer className="link-to" style={pCss} to="/user/sign">
                          <a href="#">Sign up for classes</a>
                        </LinkContainer>
                      </div>
                      <div style={{ padding: "0.15rem 12px" }}>
                        <LinkContainer className="link-to" style={pCss} to="/user/classes">
                          <a href="#">My classes</a>
                        </LinkContainer>
                      </div>
                      <div style={{ padding: "0.15rem 12px" }}>
                        <LinkContainer className="link-to" style={pCss} to="/notifications">
                          <a href="#">
                            Notifications {" "}
                            {userInfo.notificationsCounter > 0 && (
                              <Badge pill bg="danger">
                                {userInfo.notificationsCounter}
                              </Badge>
                            )}
                          </a>
                        </LinkContainer>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div style={{ padding: "0.25rem 12px" }}>
                    <LinkContainer className="link-to" style={pCss} to="/login" >
                      <a href="#">Login</a>
                    </LinkContainer>
                  </div>

                  <div style={{ padding: "0.25rem 12px" }}>
                    <LinkContainer className="link-to" style={pCss} to="/register">
                      <a href="#">Register</a>
                    </LinkContainer>
                  </div>
                </>
              )}

            </Col>
            <Col ms={6}>
              <Row style={{ padding: "0.25rem 12px" }}>
                <p style={{ marginBottom: "0" }}>Contact me:</p>
              </Row>
              <Row style={{ padding: "0.25rem 12px" }}>
                <p style={{ marginBottom: "0" }}>olszanecki.jakub@gmail.com</p>
              </Row>
              <div style={{ padding: "0.25rem 12px", marginBottom: "0" }}>
                <a target="_blank" href="https://github.com/jakubolszanecki">
                  <span style={{ marginBottom: "0" }}>
                    <i className="bi bi-github"></i>{" "}
                    GitHub
                  </span>
                </a>
              </div>
              <div style={{ padding: "0.25rem 12px" }}>
                <a target="_blank" href="https://www.linkedin.com/in/jakub-olszanecki-56370a232/">
                  <span style={{ marginBottom: "0" }}>
                    <i className="bi bi-linkedin"></i>{" "}
                    LinkedIn
                  </span>
                </a>
              </div>
            </Col>
          </Row>
          <Row style={{ minHeight: "60px", padding: "1rem 0 1rem 0", fontSize: "1rem" }}>
            <Col style={{ alignSelf: "center" }}>
              Copyright &copy; JO-Coaching. Built by Jacob Olszanecki
            </Col>
          </Row>
        </Container>

      </Container>
    </footer>
  )
}

export default FooterComponent;