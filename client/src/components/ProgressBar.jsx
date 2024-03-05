/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const colors = [
  "rgb(255, 214, 161)",
  "rgb(255, 175, 163)",
  "rgb(108, 115, 145)",
];

const randomColors = colors[Math.floor(Math.random() * colors.length)];

const ProgressBar = ({ progress }) => {
  return (
    <div className="outer-bar">
      <div
        style={{ width: `${progress}%`, backgroundColor: randomColors }}
        className="inner-bar"
      ></div>
    </div>
  );
};

export default ProgressBar;
