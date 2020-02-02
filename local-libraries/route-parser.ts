export default `
  window.RouteParseRN = function(compareRoute, actualRoute) {
    if (compareRoute === actualRoute) return true;
    if (!compareRoute || !actualRoute) return false;
    let __rn_slash_reg = new RegExp("/", "g");
    let __rn_compareArr = compareRoute.match(__rn_slash_reg);
    let __rn_actualArr = actualRoute.match(__rn_slash_reg);
    if (!__rn_compareArr || !__rn_actualArr || __rn_compareArr.length !== __rn_actualArr.length) return false;

    if (compareRoute.indexOf("*") !== -1) {
      let compareRouteRegExp = compareRoute.replace(new RegExp("*", "g"), "(.*)");
      let __rn_reg = new RegExp(compareRouteRegExp, "g");
      let __rn_match = actualRoute.match(__rn_reg);

      if (!!__rn_match && __rn_match.length > 0) {
        return true;
      } else return false;
    }
    return false;
  }
`;