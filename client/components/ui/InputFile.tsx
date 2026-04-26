"use client";

import React, { useRef, useState } from "react";
import { Button } from "./button";
import { Trash, UploadCloud } from "lucide-react";

type FileUploadProps = {
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
};

export function InputFile({
  value,
  onChange,
  accept = "image/*",
  maxSizeMB = 100,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const formatSize = (size: number) => {
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const handleFile = (file: File) => {
    setError(null);

    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setError(`Ficheiro muito grande (max ${maxSizeMB}MB)`);
      return;
    }

    if (accept && !file.type.match(accept.replace("*", ".*"))) {
      setError("Tipo de ficheiro inválido");
      return;
    }

    onChange?.(file);

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeFile = () => {
    setPreview(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full space-y-3">
      {!error && value ? null : (
        <>
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition
        ${isDragging ? "border-primary bg-primary/10" : "hover:bg-muted/50"}`}
          >
            {/* overlay drag */}
            {isDragging && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm">
                <UploadCloud className="mb-2 h-6 w-6" />
                <p className="text-sm font-medium">Solta o ficheiro aqui</p>
              </div>
            )}

            <p className="text-sm font-medium">
              Arrasta ou clica para selecionar
            </p>
            <p className="text-xs text-muted-foreground">
              {accept} • até {maxSizeMB}MB
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="hidden"
          />
        </>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {value && (
        <div className="flex items-center gap-4 rounded-xl border p-3">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="h-16 w-16 rounded-md object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted text-xs">
              FILE
            </div>
          )}

          <div className="flex-1">
            <p className="text-sm font-medium">{value.name}</p>
            <p className="text-xs text-muted-foreground">
              {value.type || "unknown"} • {formatSize(value.size)}
            </p>
          </div>

          <Button onClick={removeFile} variant="outline" size="icon">
            <Trash />
          </Button>
        </div>
      )}
    </div>
  );
}
