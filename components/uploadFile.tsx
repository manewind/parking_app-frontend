import React, { useState } from "react";
import axios from "axios";

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Выберите файл для загрузки");
      return;
    }

    const fileType = determineFileType(file);

    if (!fileType) {
      alert("Невозможно определить тип файла");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileType);

    try {
      const response = await axios.post("/uploadExcel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
    }
  };

  const determineFileType = (file: File): string | null => {
    if (file.name.includes("payments")) return "payments";
    if (file.name.includes("bookings")) return "bookings";
    if (file.name.includes("users")) return "users";
    if (file.name.includes("reviews")) return "reviews";
    return null;
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Загрузить</button>
    </div>
  );
};

export default FileUploader;
