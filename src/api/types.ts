export type Game = {
  'id': number
  'slug': string
  'name': string
  'name_original': string
  'description': string
  'metacritic': number
  'metacritic_platforms': [
    {
      'metascore': number
      'url': string
    }
  ]
  'released': string // 2021-02-24
  'tba': true
  'updated': string // 2021-02-24T09:24:50Z
  'background_image': string // url
  'background_image_additional': string
  'website': string // url
  'rating': number
  'rating_top': number
  'ratings': {}
  'reactions': {}
  'added': number
  'added_by_status': {}
  'playtime': number
  'screenshots_count': number
  'movies_count': number
  'creators_count': number
  'achievements_count': number
  'parent_achievements_count': string
  'reddit_url': string
  'reddit_name': string
  'reddit_description': string
  'reddit_logo': string // url
  'reddit_count': number
  'twitch_count': string
  'youtube_count': string
  'reviews_text_count': string
  'ratings_count': number
  'suggestions_count': number
  'alternative_names': [
    string
  ]
  'metacritic_url': string
  'parents_count': number
  'additions_count': number
  'game_series_count': number
  'esrb_rating': {
    'id': number
    'slug': string
    'name': string
  }
  'platforms': [
    {
      'platform': {
        'id': number
        'slug': string
        'name': string
      }
      'released_at': string
      'requirements': {
        'minimum': string
        'recommended': string
      }
    }
  ]
  'parent_platforms': [
    {
      'platform': {
        'id': number
        'slug': string
        'name': string
      }
    }
  ]
  tags: [
    {
      id: number
      name: string
      slug: string
      language: string
      games_count: number
      image_background: string
    }
  ]
  genres: [
    {
      id: number
      name: string
      slug: string
      games_count: number
      image_background: string
    }
  ]
  developers?: {
    games_count: number
    id: number
    image_background: string
    name: string
    slug: string
  }[]
  publishers?: {
    games_count: number
    id: number
    image_background: string
    name: string
    slug: string
  }[]
  stores?: {
    id: number
    store: {
      domain: string
      games_count: number
      id: number
      image_background: string
      name: string
      slug: string
    }
    url: string
  }[]
}

export type CategoryGames = {
  count: number
  next: string | null
  previous: string | null
  results: Game[]
}

export type Creators = {
  games_count: number
  id: number
  image_background: string
  name: string
  slug: string
}

export type CategoryCreators = {
  count: number
  next: string | null
  previous: string | null
  results: Creators[]
}

export type CategoryData = {
  id: number
  name: string
  slug: string
  games_count: string
  image_background: string
  description: string
}

export type Achievement = {
  id: number
  name: string
  description: string
  image: string
  percent: number
}

export type AchievementData = {
  count: number
  next: string
  previous: string
  results: Achievement[]
}

export type ApiRedirect = {
  redirect: boolean
  slug: string
}

export type ApiError = {
  detail: string
}

export type GameResponse = Game | ApiRedirect | ApiError
