export default function setCookie(name, value) {
    let CookieName = encodeURIComponent(name);
    let CookieValue = encodeURIComponent(value);
    document.cookie =`${CookieName}=${CookieValue}; max-age=600; path=/`;
    }


  