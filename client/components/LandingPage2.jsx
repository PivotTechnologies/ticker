import React from 'react';


const LandingPage2 = () => (
  <div>

    <div className="marketing">
      <p>Ticket re-sale made easy.</p>
      <iframe frameborder="0"
        src="https://youtube.com/v/FuwzZDvuERc?autoplay=1&controls=0&loop=1&playlist=FuwzZDvuERc&showinfo=0&autohide=1&start=15&end=55&modestbranding=1">
      </iframe>
    </div>

    <div className="intro">

      <div className="introBox">
        <img className="introImg" src="searchList.png" />
        <p className="introText">Ticker is an ticket auction site that makes it easy to buy or sell tickets.</p>
      </div>

      <div className="introBox">
        <img className="introImg" src="searchList.png" />
        <p className="introText"> Find cheap tickets to events in your area.</p>
      </div>

      <div className="introBox">
        <img className="introImg" src="searchList.png" />
        <p className="introText">Sell your tickets easily using our automated auction system.</p>
      </div>

    </div>



    <div className="footer">
      <img className="logoFooter" src="pivotLogo.png" />
    </div>

  </div>

);

export default LandingPage2;
