import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const showResult = (isDraw, winner) => {
  if (isDraw) {
    return (
      <>
        <div className='text-center result player draw'>{winner}</div>
        <div className='text-center'>Draw</div>
      </>
    );
  }

  return (
    <>
      <div className={`text-center result player${` ${winner}`}`}>{winner}</div>
      <div className='text-center'>Winner</div>
    </>
  );
};

const ResultModal = ({ open, winner, onClick, isDraw = false }) => {
  return (
    <Modal open={open} size='mini'>
      <Modal.Content>
        <Modal.Description className='result-wrapper'>
          {showResult(isDraw, winner)}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className='text-center'>
        <Button onClick={onClick} positive content='Play again' />
      </Modal.Actions>
    </Modal>
  );
};

export default ResultModal;
