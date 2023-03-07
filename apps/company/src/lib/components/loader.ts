const cloudflareLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const params = [`width=${width}`, `quality=${quality || 75}`, "format=auto"];
  return `https://info-dsm.info/cdn-cgi/image/${params.join(",")}/${src}`;
};
export default cloudflareLoader;
