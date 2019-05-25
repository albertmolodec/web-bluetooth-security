export default store => {
  store.on('@init', () => ({ device: 'bulb' }));
};
