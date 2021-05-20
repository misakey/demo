const updateFavicons = (isVault:boolean):void => {
  const favicons = document.getElementsByClassName('favicon');
  Array.prototype.filter.call(favicons, (favicon) => {
    if (isVault) {
      favicon.href = favicon.href.replace('faviconpack-sync', 'faviconpack-vault');
    } else {
      favicon.href = favicon.href.replace('faviconpack-vault', 'faviconpack-sync');
    }
  })
  
}

export default updateFavicons;
