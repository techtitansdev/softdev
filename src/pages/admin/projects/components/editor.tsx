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
  subredditId: string
}

export const NewEditor: React.FC<EditorProps> = ({ subredditId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      subredditId,
      title: '',
      content: null,
    },
  })
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const pathname = usePathname()

//   const { mutate: createPost } = useMutation({
//     mutationFn: async ({
//       title,
//       content,
//       subredditId,
//     }: PostCreationRequest) => {
//       const payload: PostCreationRequest = { title, content, subredditId }
//       const { data } = await axios.post('/api/subreddit/post/create', payload)
//       return data
//     },
//     onError: () => {
//       return console.log({
//         title: 'Something went wrong.',
//         description: 'Your post was not published. Please try again.',
//         variant: 'destructive',
//       })
//     },
//     onSuccess: () => {
//       // turn pathname /r/mycommunity/submit into /r/mycommunity
//       const newPathname = pathname.split('/').slice(0, -1).join('/')
//       router.push(newPathname)

//       router.refresh()

//       return toast({
//         description: 'Your post has been published.',
//       })
//     },
//   })

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

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        onChange: () => {
          // Ensure ref.current is defined before accessing its properties
          if (ref.current) {
            // When there's a change, save the blocks and log them
            ref.current.save().then(blocks => {
              console.log(JSON.stringify(blocks, null, 2));
            });
          }
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
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
  }, [])

  
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
    <div className='justify-center content-center w-full p-4 bg-zinc-50 rounded-lg border border-blue-200'>
      <form
        id='subreddit-post-form'
        className='flex flex-col items-center'
        onSubmit={handleSubmit(onSubmit)}

        >
        <div className='justify-center heading prose prose-stone dark:prose-invert'>
     
          <div id='editor' className='justify-center min-h-[500px] min-w-[500px]' />
        </div>
        <button> submit </button>
      </form>
    </div>
  )
}