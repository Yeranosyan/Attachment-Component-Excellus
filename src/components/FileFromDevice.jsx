import { useState, useMemo, useCallback, useRef, useContext } from "react";
import {
  FileInput,
  createUID,
  useAfterInitialEffect,
} from "@pega/cosmos-react-core";
import { FileServiceContext } from "@pega/cosmos-react-demos/lib/work/CaseView/FileService.mock";

const FileFromDevice = () => {
  const { files, attachFile, cancelFile, deleteFile } =
    useContext(FileServiceContext);
  const errCounts = useRef({ invalidType: 0, invalidSize: 0 });
  const [hasError, setHasError] = useState(false);
  const sizeLimit = 100 || 100;
  const onFilesAdded = useCallback(
    (addedFiles) => {
      errCounts.current = { invalidType: 0, invalidSize: 0 };

      const newFiles = addedFiles.filter((f) => {
        let isValidSize = true;
        if (f.size / 1000000 > sizeLimit) {
          errCounts.current.invalidSize += 1;
          isValidSize = false;
        }
        return isValidSize;
      });
      setHasError(newFiles.length < addedFiles.length);
      newFiles.forEach((File) => {
        const id = createUID();
        attachFile({
          id,
          thumbnail: File.type.startsWith("image")
            ? URL.createObjectURL(File)
            : undefined,
          name: File.name,
          category: "",
          File,
          onCancel: () => {
            cancelFile(id);
          },
        });
      });
    },
    [attachFile, cancelFile, sizeLimit]
  );

  useAfterInitialEffect(() => {
    if (files.length === 0) setHasError(false);
  }, [files.length]);

  const info = useMemo(() => {
    return hasError
      ? errCounts.current.invalidSize > 0 && (
          <div>{`File size must be less than ${sizeLimit}MB`}</div>
        )
      : null;
  }, [hasError, sizeLimit]);

  return (
    <FileInput
      label="File input label"
      labelHidden={true}
      multiple={true}
      status={hasError ? "error" : undefined}
      info={info}
      required={false}
      disabled={false}
      onFilesAdded={onFilesAdded}
      files={files.map((file) => {
        return {
          ...file,
          onCancel: undefined,
          onPreview: () => {},
          onDownload: () => {},
          onDelete: () => {
            deleteFile(file.id);
          },
        };
      })}
    />
  );
};

export default FileFromDevice;
