export const getQueryParams = (url) => {
  let a = url.substr(1).split("="); //Array[("type", "series")];
  return a[1]; //series
};
