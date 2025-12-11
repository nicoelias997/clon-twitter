'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from './server'

// Tal vez no me toma porque es constante y no funcion?
export const addPost = async (formData: FormData, responseId: string | null) => {
  const content = formData.get('content')
  if (content === null) return

  const supabase = createClient()
  // Revisar si el user esta autentificado
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  await supabase.from('posts').insert({
    content,
    user_id: user.id,
    response_id: responseId ?? null
  })
  revalidatePath('/')
}

export const handleLike = async (postId: string) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Usuario no autenticado')

  try {
    // Verificar si el usuario ya dio like al post
    const { data: existingLike } = await supabase
      .from('likes')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

    if (existingLike) {
      // Eliminar el like existente
      await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id)
    } else {
      // Agregar un nuevo like
      await supabase
        .from('likes')
        .insert([{ post_id: postId, user_id: user.id }])
        .select()
    }

    // Revalidate paths where this post might appear
    revalidatePath('/')
    revalidatePath('/[username]', 'page')
    revalidatePath('/[username]/[postId]', 'page')
  } catch (error) {
    console.error('Error al manejar el "me gusta" del post', error)
    throw error
  }
}

export const handleRetpost = async (postId: string) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Usuario no autenticado')

  try {
    // Verificar si el usuario ya hizo retweet al post
    const { data: existingRetpost } = await supabase
      .from('retposts')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

    if (existingRetpost) {
      // Eliminar el retweet existente
      await supabase
        .from('retposts')
        .delete()
        .eq('id', existingRetpost.id)
    } else {
      // Agregar un nuevo retweet
      await supabase
        .from('retposts')
        .insert([{ post_id: postId, user_id: user.id }])
        .select()
    }

    revalidatePath('/')
    revalidatePath('/[username]', 'page')
    revalidatePath('/[username]/[postId]', 'page')
  } catch (error) {
    console.error('Error al manejar el retweet del post', error)
    throw error
  }
}

export const handleFavorite = async (postId: string) => {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Usuario no autenticado')

  try {
    // Verificar si el usuario ya marcó como favorito el post
    const { data: existingFavorite } = await supabase
      .from('favorites')
      .select('*')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

    if (existingFavorite) {
      // Eliminar el favorito existente
      await supabase
        .from('favorites')
        .delete()
        .eq('id', existingFavorite.id)
    } else {
      // Agregar un nuevo favorito
      await supabase
        .from('favorites')
        .insert([{ post_id: postId, user_id: user.id }])
        .select()
    }

    revalidatePath('/')
    revalidatePath('/[username]', 'page')
    revalidatePath('/[username]/[postId]', 'page')
    revalidatePath('/favorites')
  } catch (error) {
    console.error('Error al manejar el favorito del post', error)
    throw error
  }
}
