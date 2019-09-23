import React from 'react';
import { Card, List, Button } from 'semantic-ui-react';

const History = () => {
  return (
    <Card className="history-block">
      <Card.Content>
        <div className="box-title">
          <h6 className="history-title">History</h6>
          <Button circular size="mini" icon="angle down" />
        </div>

        <Card.Description className="history-items">
          <List>
            <List.Item>
              <Button size="small" fluid>
                Jump to step #1
              </Button>
            </List.Item>
            <List.Item>
              <Button size="small" fluid>
                Jump to step #1
              </Button>
            </List.Item>
            <List.Item>
              <Button size="small" fluid>
                Jump to step #1
              </Button>
            </List.Item>
            <List.Item>
              <Button size="small" fluid>
                Jump to step #1
              </Button>
            </List.Item>
            <List.Item>
              <Button size="small" fluid>
                Jump to step #1
              </Button>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default History;
