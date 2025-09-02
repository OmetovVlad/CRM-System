import styles from './TaskGroups.module.scss';
import type { Filter, TodoInfo } from '../../types';

type FilterProps = {
  filter: Filter;
  info: TodoInfo;
  setFilter: (filter: Filter) => void;
};

export const TaskGroups = ({ filter, info, setFilter }: FilterProps) => {
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
            {key === 'all' ? 'Все ' : null}
            {key === 'inWork' ? 'В работе ' : null}
            {key === 'completed' ? 'Сделано ' : null}({value})
          </button>
        );
      })}
    </div>
  );
};
