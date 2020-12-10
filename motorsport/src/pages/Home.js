import React from "react";

function Home() {
  return (
    <React.Fragment>
      <header>
        <div className="overlay"></div>
        <video
          playsInline="playsinline"
          autoPlay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source src="/videos/intro.m4v" type="video/mp4" />
        </video>
        <div className="container h-100">
          <div className="d-flex h-100 text-center align-items-center">
            <div className="w-100 text-white">
              <h1 className="display">
                <img src="/logo/logo.png" width="75%" alt="" />
              </h1>
              {/* <p className="lead mb-0">Scroll down for more</p> */}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Home;
