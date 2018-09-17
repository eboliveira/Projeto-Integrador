import DB from '@/services/Api'

export default {
  fetchPosts () {
    return DB.get('posts')
  }
}
