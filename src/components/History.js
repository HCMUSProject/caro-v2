import React from 'react';
import { Card, List, Button } from 'semantic-ui-react';

const History = ({ history, jumpTo, toggleSort, selected, sort }) => {
  const renderMoves = () => {
    if (!history) return <></>;

    // default : sort = true
    history.sort((p1, p2) => {
      const comp = p1.id <= p2.id;
      return comp === sort ? -1 : 1;
    });

    return history.map(step => {
      const { lastPosition, id } = step;
      const desc = id
        ? `Move to #${id}. Position [${lastPosition.x},${lastPosition.y}]`
        : 'Go to game start';

      const isSelect = id === selected;
      return (
        // eslint-disable-next-line react/no-array-index-key
        <List.Item key={id}>
          <Button
            primary={isSelect}
            size='small'
            fluid
            onClick={() => jumpTo(id)}
          >
            {desc}
          </Button>
        </List.Item>
      );
    });
  };

  const sortIcon = sort ? 'angle down' : 'angle up';

  return (
    <Card className='history-block'>
      <Card.Content>
        <div className='box-title'>
          <h6 className='history-title'>History</h6>
          <Button
            size='mini'
            icon={sortIcon}
            onClick={toggleSort}
            label='Order by'
          />
        </div>

        <Card.Description className='history-items'>
          <List>{renderMoves()}</List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default History;
