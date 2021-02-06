import styled from "styled-components";
import React, { ChangeEventHandler, PropsWithChildren } from "react";
import { apiInner } from "../../../api/hooks";

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

interface ImageUploaderProps {
  disabled?: boolean;
  onChange: (url: string) => void;
  onError?: () => void;
}

export default (p: PropsWithChildren<ImageUploaderProps>) => {
  const uploadImage = async (file: File) => {
    const form = new FormData();
    form.append("image", file);

    const response = await apiInner.post<string, any>(`/v1/player/upload`, form, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });

    p.onChange(response.data);
  };

  const onInputFileList: ChangeEventHandler<HTMLInputElement> = e => {
    const fileList = e.target.files;
    if (fileList && fileList.length) uploadImage(fileList[0]);
  };

  return (
    <ImageUploaderLabel>
      <HiddenInput type="file" accept="image/png,image/jpg" onChange={onInputFileList} />
      {p.children}
    </ImageUploaderLabel>
  );
};
