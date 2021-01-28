export const getIdByUrl = (url: string) => {
  return url.split('/').slice(-2)[0];
};
