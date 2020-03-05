export interface UnsplashUser {
  'id': string
  'username': string
  'name': string
  'portfolio_url': string
  'bio': string
  'location': string
  'total_likes': number
  'total_photos': number
  'total_collections': number
  'instagram_username': string
  'twitter_username': string
  'profile_image': {
    'small': string
    'medium': string
    'large': string
  },
  'links': {
    'self': string
    'html': string
    'photos': string
    'likes': string
    'portfolio': string
  }
}

export interface UnsplashCollection {
  'id': number
  'title': string
  'published_at': string
  'updated_at': string
  'cover_photo': string | null
  'user': UnsplashUser | null
}

export interface UnsplashPhoto {
  'id': string
  'created_at': string
  'updated_at': string
  'width': number
  'height': number
  'color': string
  'likes': number
  'liked_by_user': boolean
  'description': string
  'user': UnsplashUser
  'current_user_collections': Array<UnsplashCollection>
  'urls': {
    'raw': string
    'full': string
    'regular': string
    'small': string
    'thumb': string
  },
  'links': {
    'self': string
    'html': string
    'download': string
    'download_location': string
  }
}

