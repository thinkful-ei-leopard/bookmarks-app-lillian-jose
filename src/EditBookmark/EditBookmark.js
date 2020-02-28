import React from 'react'
import config from '../config'
import BookmarksContext from '../BookmarksContext'
import './EditBookmark.css'

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

export default class EditBookmark extends React.Component{
  state = {
    id: '',
    title:'',
    url:'',
    description: '',
    rating: '',
  }

  static contextType = BookmarksContext;

  componentDidMount() {
    const bookmarkId = this.props.match.params.id
    console.log(bookmarkId)
    fetch(`https://localhost:8000/api/bookmarks/${bookmarkId}`, {
      method: 'GET', 
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if(!res.ok){
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      // .then(responseData => {
      //   this.setState({
      //     id: responseData.id,
      //     title: responseData.title,
      //     url: responseData.url,
      //     description: responseData.description,
      //     rating: responseData.rating
      //   })
      // })
      .then(res => console.log(res))
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleSubmit = (bookmark, callback) => {
    const { bookmarkId } = this.props.match.params
    fetch(`https://localhost:8000/api/bookmarks/${bookmarkId}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if(!res.ok){
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then( () => {
        callback(callback)
        this.context.updateBookmark(bookmark)
        this.props.history.push('/')
      })
  }

  render() {
    const { title, url, description, rating } = this.state
    console.log(this.state)
    return (
      <section className="EditBookmark__form">
        <h2>Edit Bookmark</h2>
        <form className='EditBookmark__form' onSubmit={this.handleSubmit}>
        <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
              value={title}
              onChange={e => this.setState({title: e.target.value})}
            />
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
              value={url}
              onChange={e => this.setState({url: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={e => this.setState({description: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue='1'
              min='1'
              max='5'
              required
              value={rating}
              onChange={e => this.setState({rating: e.target.value})}
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}