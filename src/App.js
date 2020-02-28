import React, { Component } from 'react';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import EditBookmark from './EditBookmark/EditBookmark';
import BookmarksContext from './BookmarksContext';
import { Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  updateBookmark = updatedBookmark => {
    this.setState({
      bookmarks: this.state.bookmarks.map(b => (b.id !== updatedBookmark.id) ? b : updatedBookmark)
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      // .then(res => console.log(res))
      .then(res => this.setState({ bookmarks: res }))
      // .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      updateBookmark:this.updateBookmark,
    }
    console.log(this.state.bookmarks)
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
        <Nav />
        <div className='content' aria-live='polite'>
          <Route
            exact
            path='/bookmarks'
            component={BookmarkList}
          />
          <Route 
            path='/add-bookmark'
            component={AddBookmark}
          />
          <Route
            path='/edit-bookmark/:id'
            component={EditBookmark}
          />
        </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
