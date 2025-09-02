export const validateTodoTitle = (title: string): { title: string; error: string } => {
  if (title.trim().length < 2 || title.trim().length > 64) {
    return {
      title: title.trim(),
      error: 'Задача должна быть не менее 2 и не более 64 символов.',
    };
  }
  return {
    title: title.trim(),
    error: '',
  };
};
