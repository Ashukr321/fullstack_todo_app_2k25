const getCookies = (keys: string[]): Record<string, string | undefined> => {
  const cookies: Record<string, string | undefined> = {};

  if (typeof document === 'undefined') {
    // Not in the browser, return empty cookies
    return cookies;
  }

  const allCookies = document.cookie
    .split(';')
    .reduce((acc: Record<string, string>, cookie) => {
      const [rawKey, ...rest] = cookie.trim().split('=');
      acc[rawKey] = rest.join('=');
      return acc;
    }, {});

  keys.forEach(key => {
    cookies[key] = allCookies[key];
  });

  return cookies;
};

export default getCookies;
