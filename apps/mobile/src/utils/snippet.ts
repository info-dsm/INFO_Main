export default function snippet(text: string, length: number) {
  var str = text;
  if (text.length > length) {
    str = text.substr(0, length - 2) + '...';
  }
  return str;
}
