import styles from './TaskGroups.module.scss';

type TodoInfo = {
  all: number;
  completed: number;
  inWork: number;
};

type Filter = {
  filter: string;
  info: TodoInfo;
  setFilter: (filter: string) => void;
};

export const TaskGroups = ({ filter, info, setFilter }: Filter) => {
  return (
    <div className={styles.taskGroups}>
      {Object.entries(info).map(([key, value]) => (
        <button
          key={key}
          onClick={() => {
            setFilter(key);
          }}
          className={filter === key ? styles.active : ''}
        >
          {key === 'all' ? 'Все ' : null}
          {key === 'inWork' ? 'В работе ' : null}
          {key === 'completed' ? 'Сделано ' : null}({value})
        </button>
      ))}
    </div>
  );
};
