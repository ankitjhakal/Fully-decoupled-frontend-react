import React from "react";
import { getAuthClient } from "../utils/auth";

const auth = getAuthClient();

const NodeDelete = ({ id, title, onSuccess }) => {
  function doConfirm() {
    return window.confirm(`Are you sure you want to delete ${title}?`);
  }

  function doDelete() {
    const fetchUrl = `/jsonapi/node/article/${id}`;
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    };
    try {
      auth.fetchWithAuthentication(fetchUrl, fetchOptions)
        .then((response) => {
          // Should be 204. If so, call the onSuccess callback.
          if (response.status === 204) {
            if (typeof onSuccess === 'function') {
              onSuccess(id);
            }
          }
        });
    } catch (error) {
      console.log('API error', error);
    }
  }

  return (
    <button onClick={event => doConfirm() && doDelete()}>
      delete
    </button>
  );
};

export default NodeDelete;
