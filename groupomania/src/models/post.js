import { Model } from '@vuex-orm/core'

export default class Post extends Model {
  static entity = 'posts'

  static fields () {
    return {
      id: this.attr(null),
      title: this.attr(""),
      description: this.attr(""),
      likes: this.attr(0),
      dislikes: this.attr(0),
    }
  }
}
