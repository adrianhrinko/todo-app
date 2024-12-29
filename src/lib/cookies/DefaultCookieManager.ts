import Cookies from "js-cookie";

export const DefaultCookieManager = {
  addAuthCookie: (uid: string) => {
    Cookies.set("uid", uid, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      domain: window.location.hostname,
      expires: 7  // Cookie expires in 7 days
    })
  },
  removeAuthCookie: () => {
    Cookies.remove("uid");
  },
};
