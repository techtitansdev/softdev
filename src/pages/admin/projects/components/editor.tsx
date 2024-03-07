'use client'

import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

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

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: {
            class: Header, 
            inlineToolbar: ['link'] 
          }, 
          image: ImageTool,
          list: List,
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

    const payload: PostCreationRequest = {
      title: 'tittle',
      content:blocks,
      subredditId,
    }

    console.log(blocks)
  }

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register('title')

  return (
    <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
      <form
        id='subreddit-post-form'
        className='w-fit'
        onSubmit={handleSubmit(onSubmit)}>
        <div className='prose prose-stone dark:prose-invert'>
     
          <div id='editor' className='min-h-[500px]' />
          <p className='text-sm text-gray-500'>
            Use{' '}
            <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
        <button> submit </button>
      </form>
    </div>
  )
}