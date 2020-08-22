import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import compose from 'lodash.flowright'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

const AddBook = (props) => {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('')

    const displayAuthors = () => {
        let data = props.getAuthorsQuery
        if (data.loading) {
            return (<option disabled>Loading Authors...</option>)
        }
        return (
            data.authors.map(author => {
                return (<option key={author.id} value={author.id} >{author.name}</option>)
            })
        )
    }

    const submitForm = (e) => {
        e.preventDefault();
        props.addBookMutation({
            variables: {
                name: name, genre: genre, authorId: authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    return (
        <div className="container" style={{ margin: 50 }}>
            <form id="add-book" onSubmit={submitForm}>
                <div className="field">

                    <label>Book name:</label>
                    <input type="text" value={name} onChange={e => {
                        e.preventDefault()
                        setName(e.target.value)
                    }} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" value={genre} onChange={e => {
                        e.preventDefault()
                        setGenre(e.target.value)
                    }} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select value={authorId} onChange={e => {
                        e.preventDefault()
                        setAuthorId(e.target.value)
                    }}>
                        <option>Select author</option>
                        {displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        </div>
    )
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
