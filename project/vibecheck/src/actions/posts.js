import { GET_POSTS, ADD_POST } from "./types";

export const getPosts = () => dispatch => {
    fetch("api/posts/").then(response => {
        return response.json();
    }).then(posts => {
        dispatch({
            type: GET_POSTS,
            payload: posts
        });
    }).catch(err => console.log(err));
}

export const addPost = post => dispatch => {
    fetch("api/posts/", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(response => {
        return response.json();
    }).then(post => {
        dispatch({
            type: ADD_POST,
            payload: post
        });
    }).catch(err => console.log(err));
}