export default `

window.RouteParseRN = function(compareRoute, actualRoute) {
  if (compareRoute === actualRoute) return true;
  
  // count character "/"
  const compareArr = compareRoute.match(/\//g);
  const actualArr = actualRoute.match(/\//g);
  
  if (!compareArr || !actualArr || compareArr.length !== actualArr.length) return false;
  
  if (compareRoute.includes("*")) {
    let compareRouteRegExp = compareRoute.replace(/\*/g, "(.*)");
    let reg = new RegExp(compareRouteRegExp, "g");
    const match = actualRoute.match(reg);
    if (!!match && match.length > 0) {
      return true;
    } else return false;
  }
  return false;
}

`;