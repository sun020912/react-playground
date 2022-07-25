const getQsFromUrl = (url, prefix) => {
  const sp = new URL(url).searchParams;
  const qs = sp.toString();
  return prefix ? `${prefix}${qs}` : qs;
};

export default getQsFromUrl;
