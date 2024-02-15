const $builtinmodule = function(name) {
    const setCookie = function(aname, avalue) {
        const name = Sk.ffi.remapToJs(aname);
        const val = Sk.ffi.remapToJs(avalue);
        const cname = encodeURIComponent(name);
        const cval = encodeURIComponent(val);
        const newCookie = cname + "=" + cval + ";Secure;SameSite=None;max-age=70000000";
        document.cookie = newCookie; //expires in a bit more than 2 years
    };
    const getCookie = function(aname) {
        const cookieList = document.cookie ? document.cookie.split(';') : [];
        if (cookieList.length === 0)
            return Sk.ffi.remapToPy(null);
        const allCookies = {};
        for (let cookie of cookieList) {
            const cookieParts = cookie.split('=');
            const name = decodeURIComponent(cookieParts[0]);
            const value = decodeURIComponent(cookieParts[1]);
            allCookies[name] = value;
        }
        const name = Sk.ffi.remapToJs(aname);
        const cname = encodeURIComponent(name);
        if (allCookies[cname] === undefined)
            return Sk.ffi.remapToPy(null);
        return Sk.ffi.remapToPy(allCookies[cname]);
    };

    return {
        ver: Sk.ffi.remapToPy("0.0.1"),
        set: new Sk.builtin.func(setCookie),
        get: new Sk.builtin.func(getCookie),
    };
};