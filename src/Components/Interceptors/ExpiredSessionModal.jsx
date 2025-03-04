import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ExpiredSessionModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Session Expired</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please log in again to continue.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExpiredSessionModal;
