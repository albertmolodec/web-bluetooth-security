module.exports = (x, y, callback) => {
  if (x <= 0 || y <= 0) {
    setTimeout(
      () =>
        callback(
          new Error('Нельзя, чтобы ширина или высота были меньше нуля', null),
        ),
      2000,
    );
  } else {
    setTimeout(
      () =>
        callback(null, {
          perimeter: () => (x + y) * 2,
          area: () => x * y,
        }),
      2000,
    );
  }
};
