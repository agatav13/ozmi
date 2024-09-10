import { useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { FileWithPreview } from "types/src/index"

interface DropFilesProps {
  name: string;
  id: string;
  onFilesAdded: (files: FileWithPreview[]) => void;
  onFileRemoved: (file: FileWithPreview) => void;
  newImages: FileWithPreview[];
  existingImages?: string[];
  handleRemoveExistingImage?: (imageToRemowe: string) => void;
}

export default function DropFiles({name, id, onFilesAdded, onFileRemoved, newImages, existingImages, handleRemoveExistingImage}: DropFilesProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    ) as FileWithPreview[];

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
    onFileRemoved(file);
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
        {existingImages && handleRemoveExistingImage && existingImages.map((image, index) => (
          <div key={index} className="ImagePreview">
            <img src={`http://localhost:5000/uploads/news-posts/${image}`} alt={`Zdjęcie ${index}`} className="PreviewImage" />
            <button type="button" onClick={() => handleRemoveExistingImage(image)} className="DeleteButton">×</button>
          </div>
        ))}
      </div>

      <div className="PreviewContainer">
        {newImages.map((file) => (
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