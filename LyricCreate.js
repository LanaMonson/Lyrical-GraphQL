import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


class LyricCreate extends Component{
    constructor(props) {
        super (props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefaul();

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId //same songId as (line17) in SongDetail.js file (songId={this.props.params.id})
            }
        }).then(() => this.setState({ content: '' }));
    }

    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add New Song</label>
                <input 
                    value= {this.state.content}
                    onChange= {event => this.setState({content: event.target.value})}
                />
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                content
            }
        }
    }
`;//shows error in GQL

export default graphql(mutation)(LyricCreate);
