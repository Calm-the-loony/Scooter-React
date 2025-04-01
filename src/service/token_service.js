export function parseCookieString() {
    let cookieString = document.cookie;
    const cookies = {};
    if (document.cookie === "") {
      return cookies;
    }
    cookieString.split(';').forEach(cookie => {
      let [name, ...rest] = cookie.trim().split('=');
      name = name?.trim();
      if (!name) {
          return;
      }
      const value = rest.join('=').trim();
      cookies[name] = value;
    });
    return cookies;
}