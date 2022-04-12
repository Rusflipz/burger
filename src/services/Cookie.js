export function setCookie(name, value) {
    let CookieName = encodeURIComponent(name);
    let CookieValue = encodeURIComponent(value);

    if(name == 'token'){document.cookie = `${CookieName}=${CookieValue}; max-age=4; path=/`;
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


//path=/ для token прописан и при попытке, перейти по прямой ссылке, происходит rederect на строницу логина, у меня не получилось повторить ваш эксперемент.