import type { Filter, TodoInfo } from '../../types';
import { Button, Flex } from 'antd';

type FilterProps = {
  filter: Filter;
  info: TodoInfo;
  setFilter: (filter: Filter) => void;
};

export const TaskFilter = ({ filter, info, setFilter }: FilterProps) => {
  const tabLabels: Record<Filter, string> = {
    all: 'Все',
    inWork: 'В работе',
    completed: 'Сделано',
  };

  return (
    <Flex gap="large" wrap style={{ margin: '2em 0 1em' }}>
      {Object.entries(info).map(([key, value]) => {
        const typedKey = key as Filter;

        return (
          <Button
            key={typedKey}
            color="primary"
            variant={filter === key ? 'outlined' : 'text'}
            style={{ flex: 1 }}
            onClick={() => {
              setFilter(typedKey);
            }}
          >
            {tabLabels[typedKey]} ({value})
          </Button>
        );
      })}
    </Flex>
  );
};
