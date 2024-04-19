'use client'

import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { z } from 'zod'


import { PostCreationRequest,PostValidator } from './postValidator'
import { useMutation } from '@tanstack/react-query'




type FormData = z.infer<typeof PostValidator>

interface EditorProps {
  onChanges: (data: any) => void,
  initialData?: any[]
}

export const NewEditor: React.FC<EditorProps> = ({onChanges,initialData}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
  })
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const pathname = usePathname()

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default
    const ImageTool = (await import('@editorjs/image')).default
    const Paragraph = (await import('@editorjs/paragraph')).default
    const Underline = (await import('@editorjs/underline')).default
    const AlignmentTuneTool = (await import('editorjs-text-alignment-blocktune')).default
    console.log('editor initialData')
    console.log('initia da',initialData)
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        onChange: async () => {
          // Ensure ref.current is defined before accessing its properties
          if (ref.current) {
            // When there's a change, save the blocks and log them
            // ref.current.save().then(blocks => {
            //   console.log(JSON.stringify(blocks, null, 2));
            // });
            const blocks = await ref.current?.save()
            console.log(JSON.stringify(blocks, null, 2));
            onChanges(blocks)
          }
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: initialData || []  },
        tools: {
          alignementTool: AlignmentTuneTool,
          underline: Underline,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes:['alignementTool']
          },
          header: {
            class: Header, 
            inlineToolbar: true,
            tunes:['alignementTool'] 
          }, 
          image: {
            class:ImageTool,
            config:{
              uploader: {
                async uploadByFile(file: any) {
                  try {
                    const formData = new FormData();
                    formData.append('file', file);
          
                    // Make a POST request to Cloudinary's upload API
                    const response = await axios.post('https://api.cloudinary.com/v1_1/dzpghgd8d/image/upload', formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data'
                      },
                      params: {
                        upload_preset: 'gxk09fmu'
                      }
                    });
          
                    // Return the secure URL of the uploaded image from Cloudinary
                    return {
                      success: 1,
                      file: {
                        url: response.data.secure_url
                      }
                    };
                  } catch (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                    // Return an error message
                    return {
                      success: 0,
                      error: {
                        message: 'Failed to upload image.'
                      }
                    };
                  }
                }
              }
            }    
          },
          list: {
            class: List,
            inlineToolbar: true,
            tunes:['alignementTool'],
          },
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
        
      })
    }
    
  }, [initialData])

  
  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        // toast({
        //   title: 'Something went wrong.',
        //   description: (value as { message: string }).message,
        //   variant: 'destructive',
        // })
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()

      setTimeout(() => {
        _titleRef?.current?.focus()
      }, 0)
    }

    if (isMounted) {
      init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()
    console.log('blocks')
  }

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register('title')

  return (
    <div className='justify-center content-center min-w-[1000px]  bg-zinc-50 rounded-lg border border-blue-200'>
      <form
        id='subreddit-post-form'
        className='flex flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}
        >
        <div className='justify-center heading prose prose-stone dark:prose-invert'>
          <div id='editor' className='justify-center min-h-[500px] min-w-[500px]' />
        </div>
      </form>
    </div>
  )
}