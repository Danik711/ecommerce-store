// Function that gets mime type of an image
export function getBase64MimeType(encoded: string) {
  let result: string = "";
  if (typeof encoded !== "string") {
    return result;
  }
  const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    result = mime[1];
  }
  return result;
}

// Function that get base64 from an image
export function getBase64Data(encoded: string) {
  const base64EncodedString = encoded.replace(/^data:\w+\/\w+;base64,/, "");
  return base64EncodedString;
}

export function getLastImageToken(photos: string[]) {
  let largestNum = 0;

  for (const photo of photos) {
    const splitted = photo.split("-");
    const token = parseInt(splitted[splitted.length - 1]);
    largestNum = largestNum > token ? largestNum : token;
  }

  return largestNum;
}

export function getFirebaseUrlMimeType(url: string) {
  const splitted = url.split("-");
  const strWithMime = splitted[splitted.length - 2];

  // Return .mimeType
  return strWithMime.substring(1, strWithMime.indexOf("?"));
}
