import { useState, useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { FileWithPreview } from "types/src/index"

interface DropFilesProps {
  name: string,
  id: string,
  onFilesAdded: (files: FileWithPreview[]) => void
}

export default function DropFiles({name, id, onFilesAdded}: DropFilesProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    ) as FileWithPreview[];

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onFilesAdded(newFiles);
  }, [onFilesAdded]);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    console.log('Rejected files:', fileRejections);
  }, []);

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    onDropRejected,
    accept: {'image/*': []},
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

  const removeFile = (file: FileWithPreview) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    onFilesAdded(newFiles);
  };

  return (
    <div>
      <div {...getRootProps()} className="DropzoneContainer">
        <input {...getInputProps()} name={name} id={id} />
        {isDragActive ? (
          <p>Upuść zdjęcie tutaj...</p>
        ) : (
          <p>Przeciągnij lub wybierz zdjęcia</p>
        )}
      </div>
      <div className="PreviewContainer">
        {files.map((file) => (
          <div key={file.name} className="ImagePreview">
            <img
              src={file.preview}
              alt={file.name}
              className="PreviewImage"
              onLoad={() => { URL.revokeObjectURL(file.preview) }}
            />
            <button onClick={() => removeFile(file)} className="DeleteButton">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}