import React from "react";

const VideoModal = ({ onClose, videoUrl }) => {
  return (
    <div style={styles.overlay}>
      <div
        className="flex flex-col gap-5 items-center justify-center"
        style={styles.modal}
      >
        <button
          onClick={() => {
            onClose();
          }}
          style={styles.closeButton}
        >
          ✖
        </button>
        <video
          className={"h-4/5"}
          controls
          style={styles.video}
          src={videoUrl}
        />
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: "5%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    overflow: "scroll",
  },
  modal: {
    position: "relative",
    width: "80%",
    maxWidth: "700px",
    background: "#fff",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    height: "90%",
    // maxHeight: "80%"
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "20px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "black",
    color: "white",
    padding: 5,
    borderRadius: 10,
  },
  video: {
    width: "100%",
    borderRadius: "8px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    height: "80%",
    objectFit: "contain",
  },
};

export default VideoModal;
