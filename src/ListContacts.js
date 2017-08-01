import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import escapeRegexExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = (query) => {
        this.setState({ query: '' })
    }

    render() {
        let showingContacts
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;

        if (query) {
            const match = new RegExp(escapeRegexExp(query), 'i');
            showingContacts = contacts.filter(contact => match.test(contact.name))
        } else {
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))
        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        type="text"
                        className="search-contacts"
                        placeholder="search contacts"
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to="/create"
                        className="add-contact"
                    />
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showingContacts.map(contact => (
                        <li key={contact.id} className="contact-list-item">
                            <div className="contact-avatar" style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}></div>
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => this.props.onDeleteContact(contact)} className="contact-remove">
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default ListContacts;