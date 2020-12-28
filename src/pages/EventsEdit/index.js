import React, { useState, useEffect } from "react";

//Material UI
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

//components
import PageManagerLayout from "../../common/PageManagerLayout";

//styles
import "./index.scss";
import useStyles from "./classes";

//APIs
import { getEvent, addEvent, updateEvent } from "../../helpers";

function Events(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  // name, description, type, area, company, experience, role
  const [event, setEvent] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  let date;
  let { id } = useParams();

  let handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    (async () => {
      const eventData = await getEvent(id);
      setEvent(eventData);
    })();
  }, [id]);
  if (id === undefined) {
    handleSubmit = (event) => {
      event.preventDefault();
      addEvent(name, image, date, description)
        .then(function (response) {
          setOpen(true);
          window.location.reload();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
  } else {
    handleSubmit = (event) => {
      event.preventDefault();
      updateEvent(id, name, image, date, description)
        .then(function (response) {
          setOpen(true);
          window.location.reload();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
  }
  console.log(event.name);
  return (
    <PageManagerLayout>
      <h1>Event Form</h1>
      <ul className="form-style-1">
        <li>
          <label>
            Event Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="field1"
            className="field-divided"
            placeholder="name"
            defaultValue={event.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />{" "}
        </li>

        <li>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </li>

        <li>
          <label>
            Description <span className="required">*</span>
          </label>
          <textarea
            name="field5"
            id="field5"
            className="field-long field-textarea"
            defaultValue={event.description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </li>
        <li>
          <Button onClick={handleSubmit} variant="outlined" color="primary">
            {" "}
            Send
          </Button>
        </li>
      </ul>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </PageManagerLayout>
  );
}

export default Events;
