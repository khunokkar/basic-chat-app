export const setCookie = (data, name) => {
  const month = 30 * 24 * 60 * 60 * 1000
  const now = new Date()
  const then = new Date(now.getTime() + month)
  // setting cookie (expires in one month)
  document.cookie = `${name}=${data}; expires=${then}; path=/`
}

export const getCookie = (name) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)===' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export const deleteCookie = (name) => {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}