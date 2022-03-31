import { Routes } from 'src/constants'
import { BaseResponse, Post } from 'src/types'
import Api from './apiService'

const orderByDateDesc = '_sort=timestamp&_order=desc'

interface PostService {
  getPosts: () => Promise<Post[]>
  getPostsByAuthorIds: (ids: number[]) => Promise<Post[]>
}

const postService: PostService = {
  getPosts: async () => {
    const orderedPosts = `${Routes.POSTS}?${orderByDateDesc}`
    const response: BaseResponse<Post[]> = await Api.get(orderedPosts)
    const { data } = response
    return data || []
  },
  getPostsByAuthorIds: async (ids: number[]) => {
    const orderedPostsByAuthors = `${Routes.POSTS}?author.id_like=[${ids.toString()}]&${orderByDateDesc}`
    const response: BaseResponse<Post[]> = await Api.get(orderedPostsByAuthors)
    const { data } = response
    return data || []
  }
}

export default postService