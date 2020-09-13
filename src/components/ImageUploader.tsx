import * as React from "react";
import { ChangeEventHandler, ReactNode } from "react";
import styled from "styled-components";
import api from "../service/api";
import { ImageEntity } from "../generated/sdk";

interface ImageUploaderProps {
  children: ReactNode;
  disabled?: boolean;
  onChange: (url: ImageEntity) => void;
  onError?: () => void;
}

const ImageUploaderLabel = styled.label`
  cursor: pointer;
  width: fit-content;
`;
const HiddenInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const ImageUploader = ({ onChange, onError, disabled, children }: ImageUploaderProps) => {
  const [isLoading, setLoading] = React.useState(false);
  const [isHover, setHover] = React.useState(false);

  const uploadFile = async (file: File) => {
    setLoading(true);
    const form = new FormData();
    form.append("image", file);

    const response = await api.post<ImageEntity>(`/public/upload`, form, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
    onChange(response.data as ImageEntity);
    setLoading(false);
  };

  const onInputFileList: ChangeEventHandler<HTMLInputElement> = e => {
    const fileList = e.target.files;
    if (fileList && fileList.length) uploadFile(fileList[0]);
  };

  return (
    <ImageUploaderLabel
      onMouseEnter={() => !isLoading && setHover(true)}
      onMouseLeave={() => !isLoading && setHover(false)}
      onDragOver={() => !isLoading && setHover(true)}
      onDragEnter={() => !isLoading && setHover(true)}
      onDragEnd={() => !isLoading && setHover(false)}
      onDragLeave={() => !isLoading && setHover(false)}
      onDrop={() => !isLoading && setHover(false)}
    >
      <HiddenInput disabled={disabled} type="file" accept="image/png,image/jpg" onChange={onInputFileList} />
      {children}
    </ImageUploaderLabel>
  );
};

export default ImageUploader;
