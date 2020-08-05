export default (error) => {
  const feedback = document.querySelector('.invalid-feedback');
  feedback.textContent = error;
  console.log(error)
};
