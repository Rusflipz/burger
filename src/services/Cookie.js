export function setCookie(name, value) {
    let CookieName = encodeURIComponent(name);
    let CookieValue = encodeURIComponent(value);
    console.log(name)
    if(name == 'token'){document.cookie = `${CookieName}=${CookieValue}; max-age=600; path=/`;
console.log('меняю токен')
}
    if(name == 'refreshToken'){document.cookie = `${CookieName}=${CookieValue}; max-age=1000; path=/`;
    console.log('меняю рефреш токен')
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