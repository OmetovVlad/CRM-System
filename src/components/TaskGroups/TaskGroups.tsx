import styles from './TaskGroups.module.scss';
import type { Filter, TodoInfo } from '../../types';

type FilterProps = {
  filter: Filter;
  info: TodoInfo;
  setFilter: (filter: Filter) => void;
};

export const TaskGroups = ({ filter, info, setFilter }: FilterProps) => {
  const tabLabels: Record<Filter, string> = {
    all: 'Все',
    inWork: 'В работе',
    completed: 'Сделано',
  };

  return (
    <div className={styles.taskGroups}>
      {Object.entries(info).map(([key, value]) => {
        const typedKey = key as Filter;

        return (
          <button
            key={typedKey}
            onClick={() => {
              setFilter(typedKey);
            }}
            className={filter === key ? styles.active : ''}
          >
            {tabLabels[typedKey]} ({value})
          </button>
        );
      })}
    </div>
  );
};
