import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContent, toggleIsContentBeingEdited } from "../../store/library";
import Button from "./Button";

const EditOptions = ({isDisabled, contentName, fieldData, setIsEditing, handleCancel}) => {

  const dispatch = useDispatch();

  const content = useSelector((state) => state.library.content)

  const [hasContentAlready, setHasContentAlready] = useState(false)

  useEffect(() => {
    const existingData = content.find((r) => r.name === contentName)
    if(existingData.value) {
      setHasContentAlready(true)
    }
  }, [])

  const cancel = () => {
    if(!hasContentAlready) {
      return handleCancel(contentName)
    }
    setIsEditing(false)
    dispatch(toggleIsContentBeingEdited(false))
  }

  const handleSave = () => {
    if(!isDisabled) {
      setIsEditing(false)
      dispatch(setContent({contentName, fieldData}));
    }
  };

  return (
    <div className="editingTools flex justify-end gap-2">
      <Button
        data={{
          title: "Cancel",
          type: "link",
          handleClick: cancel,
        }}
      />
      <Button
        isDisabled={isDisabled}
        data={{
          title: "Save",
          type: "button",
          handleClick: handleSave,
        }}
      />
    </div>
  );
};

export default EditOptions;
