import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/message.scss';

const MessageScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerMarginRight, setContainerMarginRight] = useState(0);
  const [containerMarginTop, setContainerMarginTop] = useState(0);

  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);

  function handleResize(){
    if((props.appHeight === 0)||(props.appWidth === 0)){
      return;
    }

    let aspectRatio = 4 / 3;
    let _appContentWidth = Math.min(props.appHeight * aspectRatio, props.appWidth);
    let _appContentHeight = _appContentWidth / aspectRatio;

    //TODO
    let _containerWidth = _appContentWidth * 1;
    let _containerHeight = _appContentHeight * 1;

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
  }

  let backgroundImage = '';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  return (
    <div id="screen_message" className="screen_content" style={{ backgroundImage: backgroundImage }}>
      <div id="message_text" style={{ width: containerWidth, height: containerHeight }}>
        <pre>{appSettings.message}</pre>
      </div>
      <div className="message_button" onClick={() => props.submitPuzzleSolution()}>{I18n.getTrans("i.continue")}</div>
    </div>
  );
};

export default MessageScreen;