module.exports = (temp, album) => {
  let output = temp.replace(/{%ALBUMNAME%}/g, album.albumName);
  output = output.replace(/{%ALBUMIMAGE%}/g, album.albumImage);
  output = output.replace(/{%ARTISTNAME%}/g, album.artistName);
  output = output.replace(/{%ARTISTIMAGE%}/g, album.artistImage);
  output = output.replace(/{%DATE%}/g, album.date);
  output = output.replace(/{%LENGTH%}/g, album.length);
  output = output.replace(/{%GENRE%}/g, album.genre);
  output = output.replace(/{%DESCRIPTION%}/g, album.description);
  output = output.replace(/{%ID%}/g, album.id);
  return output;
};
