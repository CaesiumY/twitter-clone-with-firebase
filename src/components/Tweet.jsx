import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "firebaseConfig";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const toggleIsEdit = () => setIsEdit((prev) => !prev);

  const onDeleteTweet = async (e) => {
    const confirm = window.confirm("Are you sure to delete this Tweet?");
    if (!confirm) return;

    await dbService.doc(`tweets/${tweetObj.id}`).delete();

    if (tweetObj.attachmentUrl) {
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };

  const onChange = (e) => {
    const { value } = e.target;

    setNewTweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });

    setIsEdit(false);
  };

  return (
    <div className="tweet">
      {isEdit ? (
        <>
          <form onSubmit={onSubmit} className="container tweetEdit">
            <input
              type="text"
              value={newTweet}
              onChange={onChange}
              maxLength={120}
              autoFocus
              required
              className="formInput"
            />
            <input type="submit" value="Edit tweet" className="formBtn" />
          </form>

          <button onClick={toggleIsEdit} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img src={tweetObj.attachmentUrl} alt="tweetImage" />
          )}
          {isOwner && (
            <div className="tweet__actions">
              <span onClick={toggleIsEdit}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={onDeleteTweet}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
