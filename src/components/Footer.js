import React from "react";
import Image from 'react-bootstrap/Image'
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
      <div className="Footer">
        <Container fluid className="Abel">
          <Row className="align-items-end">
            <Col md="auto" className="align-self-end">
              Copyright &copy; 2020 Nanowrit Labs. All Rights Reserved.
            </Col>
            <Col>
              <a href="https://app.termly.io/document/privacy-policy/09a0edbd-6de7-43fe-87e2-c95798b771f5" className="dark-goldenrod" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              {/* <Link className="dark-goldenrod" to="/privacy-policy">Privacy Policy</Link> */}
            </Col>
            <Col>
              <a href="https://app.termly.io/document/terms-of-use-for-saas/f6af0430-1ec6-4a87-ad15-271fb6609cd5" className="dark-goldenrod" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
              {/* <Link className="dark-goldenrod" to="/terms-and-conditions">Terms and Conditions</Link> */}
            </Col>
            <Col>
              <a href="https://app.termly.io/document/cookie-policy/21de2c5f-3e9e-498d-8489-0468ac074085" className="dark-goldenrod" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
              {/* <Link className="dark-goldenrod" to="/cookie-policy">Cookie Policy</Link> */}
            </Col>
            <Col>
              {/* <button allow-preference-non-eu="true" class="dark-goldenrod termly-cookie-preference-button" type="button" onClick="displayPreferenceModal()">Cookie Preferences</button> */}
            </Col>
            <Col>
              <a className="align-text-bottom" href="https://www.patreon.com/bePatron?u=32169123" data-patreon-widget-type="become-patron-button" target="_blank" rel="noopener noreferrer"> <Image rounded fluid src="https://nanowritlabs-images.s3-us-west-2.amazonaws.com/become_a_patron_button%402x.png" /> </a>
            </Col>
          </Row>
        </Container>
      </div>
  );
}