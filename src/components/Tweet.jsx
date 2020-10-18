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
    <div>
      {isEdit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newTweet}
              onChange={onChange}
              maxLength={120}
            />
            <input type="submit" value="Edit tweet" />
          </form>

          <button onClick={toggleIsEdit}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              alt="tweetImage"
              width={50}
              height={50}
            />
          )}
          {isOwner && (
            <>
              <button onClick={toggleIsEdit}>Edit</button>
              <button onClick={onDeleteTweet}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
