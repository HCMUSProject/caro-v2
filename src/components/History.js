import React from 'react';
import { Card, List, Button } from 'semantic-ui-react';

const History = ({ history, onMoveClick, onSortClick }) => {
  const renderMoves = () => {
    if (!history) return <></>;

    return history.map((step, move) => {
      const { lastPosition } = step;
      const desc = move
        ? `Move to #${move}. Position [${lastPosition.x},${lastPosition.y}]`
        : 'Go to game start';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <List.Item key={move}>
          <Button size="small" fluid onClick={() => onMoveClick(move)}>
            {desc}
          </Button>
        </List.Item>
      );
    });
  };

  return (
    <Card className="history-block">
      <Card.Content>
        <div className="box-title">
          <h6 className="history-title">History</h6>
          <Button circular size="mini" icon="angle down" onClick={onSortClick} />
        </div>

        <Card.Description className="history-items">
          <List>{renderMoves()}</List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default History;
