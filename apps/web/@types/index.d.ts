import { PropsOption } from "./interface";
declare module "*.jpg" {
  const path: string;
  export default path;
}

declare global {
  interface Window {
    daum?: {
      postcode: {
        load: (fn: () => void) => void;
        version: string;
        _validParam_: boolean;
      };
      Postcode: PropsOption;
    };
  }
}
interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

declare var File: {
  prototype: File;
  new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};
/** An object of this type is returned by the files property of the HTML <input> element; this lets you access the list of files selected with the <input type="file"> element. It's also used for a list of files dropped into web content when using the drag and drop API; see the DataTransfer object for details on this usage. */
interface FileList {
  readonly length: number;
  item(index: number): File | null;
  [index: number]: File;
}

declare var FileList: {
  prototype: FileList;
  new (): FileList;
};
