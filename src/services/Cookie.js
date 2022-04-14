export function setCookie(name, value) {
    let CookieName = encodeURIComponent(name);
    let CookieValue = encodeURIComponent(value);

    if (name == 'token') {
        document.cookie = `${CookieName}=${CookieValue}; path=/`;
    }
    if (name == 'refreshToken') {
        document.cookie = `${CookieName}=${CookieValue}; path=/`;
    }
}

export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}
