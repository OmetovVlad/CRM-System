import { NewTask } from '../../components/NewTask';

const Home = () => {
  const addNewTask = (title: string) => {
    console.log(title);
  };

  return (
    <>
      <h1>Todo List 📋</h1>
      <NewTask handleButton={addNewTask} />
      <div></div>
    </>
  );
};

export default Home;
