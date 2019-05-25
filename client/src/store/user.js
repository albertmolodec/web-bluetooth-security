export default store => {
  store.on('@init', () => ({ user: 'kevin' }));
};
