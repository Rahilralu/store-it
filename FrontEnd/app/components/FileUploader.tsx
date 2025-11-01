"use client";
import React from 'react'
import  {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image';
import {useState} from 'react';

const FileUploader = () => {
 const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const getFileType = (fileName: string) => {
    const extension = fileName.split('.').pop();
    let type = '';
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':   
      case 'gif':
        type = 'image';
        break;  
      case 'mp4':
      case 'avi':
      case 'mov':
        type = 'video';
        break;
      case 'mp3':
      case 'wav':
        type = 'audio';
        break; 
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        type = 'document';
        break;  
      default:
        type = 'unknown';
    }

    return { type, extension };
  }
  const [files,setFiles] = useState<File[]>([]);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn('uploader-button')}> 
        <Image 
          src="/assets/icons/upload.svg" 
          alt="Upload Icon" 
          width={24} 
          height={24} 
          className="mr-2"
        />
        <p>Upload File</p>
        {files.length > 0 && <ul className='uploader-preview-list'>
            <h4 className='h4 text-light-100'>Uploading</h4>

            {files.map((file,index) => (
              const { type,extenstion } = getFileType(file.name);
            ))}
          </ul>}
      </Button>
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader

