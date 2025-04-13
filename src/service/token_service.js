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


export function deleteCookieData() {
  const cookieKeys = document.cookie.split(";");

  for (let cookie of cookieKeys) {
    document.cookie = cookie.split("=")[0]+"=; Max-Age=-1; path=/";
  }

}