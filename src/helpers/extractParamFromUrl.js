const extractParamFromUrl = (url, param) => {
  const sp = new URL(url).searchParams;
  return sp.has(param) ? sp.get(param) : null;
};

export default extractParamFromUrl;
