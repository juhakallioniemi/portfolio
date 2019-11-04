(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{220:function(n,e,t){var o=t(221);"string"==typeof o&&(o=[[n.i,o,""]]);var i={insert:"head",singleton:!1};t(229)(o,i);o.locals&&(n.exports=o.locals)},221:function(n,e,t){(e=n.exports=t(101)(!1)).i(t(222),"");var o=t(102),i=o(t(226)),a=o(t(227)),r=o(t(228));e.push([n.i,"html,\nbody {\n  margin: 0;\n  padding: 0;\n}\nbody {\n  width: 100%;\n  height: 100%;\n  background: #222222;\n  color: #61DAFB;\n  text-align: center;\n  position: relative;\n  margin-bottom: 40px;\n  min-height: calc(100vh - 50px);\n  background: url("+i+") no-repeat;\n  background-size: cover;\n}\n@media only screen and (max-width: 640px) {\n  body {\n    min-height: calc(100vh - 40px);\n  }\n}\n#popup {\n  display: block;\n  position: fixed;\n  width: 400px;\n  height: 260px;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  z-index: 20;\n}\n@media only screen and (max-width: 640px) {\n  #popup {\n    width: 75%;\n    height: 180px;\n  }\n}\n#popup .popup-info {\n  width: 100%;\n  height: 40px;\n  background: #61DAFB;\n}\n@media only screen and (max-width: 640px) {\n  #popup .popup-info {\n    height: 30px;\n  }\n}\n#popup .popup-info .popup-close {\n  padding: 0;\n  position: relative;\n  width: 35px;\n  height: 100%;\n  font-size: 2.5em;\n  font-family: sans-serif;\n  color: #61DAFB;\n}\n@media only screen and (max-width: 640px) {\n  #popup .popup-info .popup-close {\n    font-size: 1.75em;\n    width: 30px;\n  }\n}\n#popup .popup-info .popup-close.close {\n  text-shadow: 0 2px 2px #000;\n  opacity: 1;\n}\n#popup .popup-info .popup-close.close:hover {\n  color: #222222;\n}\n#popup .popup-info .popup-close.close:active {\n  transform: scale(1.05);\n}\n#popup .popup-info .popup-close > * {\n  position: absolute;\n  top: -1px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n}\n#popup .popup-title {\n  max-height: 70px;\n  overflow: hidden;\n  margin: 2.5%;\n  font-size: 1.75em;\n}\n@media only screen and (max-width: 640px) {\n  #popup .popup-title {\n    font-size: 1.2em;\n    max-height: 50px;\n  }\n}\n#popup .popup-subtitle {\n  max-height: 50px;\n  overflow: hidden;\n  margin: 2.5%;\n  font-size: 1.2em;\n  font-weight: normal;\n}\n@media only screen and (max-width: 640px) {\n  #popup .popup-subtitle {\n    font-size: 0.8em;\n    max-height: 32px;\n  }\n}\n#popup .button-container {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n}\n#popup .button-container button {\n  cursor: pointer;\n  background: #61DAFB;\n  color: #000;\n  font-size: 1.05em;\n  font-weight: bold;\n  height: 41px;\n  padding: 0;\n  border-color: #61DAFB;\n  width: 40%;\n  margin: 5%;\n}\n@media only screen and (max-width: 640px) {\n  #popup .button-container button {\n    font-size: 0.75em;\n    height: 30px;\n    width: 45%;\n    margin: 2.5%;\n  }\n}\n#popup .button-container button:hover {\n  transform: scale(1.05);\n}\n#popup:after {\n  position: fixed;\n  content: \"\";\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: #222222;\n  opacity: 0.7;\n  z-index: -2;\n}\n#popup:before {\n  position: absolute;\n  content: \"\";\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: #222222;\n  z-index: -1;\n  border: 2px solid #61DAFB;\n}\nheader {\n  width: inherit;\n  height: 100%;\n  background-color: #222222;\n  margin: 10px;\n  text-align: center;\n  position: relative;\n  border: 2px solid #61DAFB;\n}\n@media only screen and (max-width: 640px) {\n  header {\n    margin: 0px;\n  }\n}\nheader .portfolio-title {\n  padding: 5px 0 0 0;\n}\nheader .portfolio-title h1 {\n  color: #61DAFB;\n  margin: 0;\n  display: inline-block;\n  vertical-align: middle;\n  cursor: pointer;\n  position: relative;\n  padding: 5px 10%;\n}\n@media only screen and (max-width: 640px) {\n  header .portfolio-title h1 {\n    font-size: 1.5em;\n  }\n}\nheader .portfolio-title h1:before,\nheader .portfolio-title h1:after {\n  content: '';\n  position: absolute;\n  width: 50%;\n  top: 100%;\n  left: 0;\n  right: 0;\n  margin: auto;\n  height: 2px;\n  background: #61DAFB;\n  opacity: 0;\n  box-shadow: 0 0 15px 2px #61DAFB;\n}\nheader .portfolio-title h1:after {\n  bottom: 0;\n  width: 0;\n}\nheader .portfolio-title h1:hover:before,\nheader .portfolio-title h1:hover:after {\n  opacity: 1;\n  width: 75%;\n  left: 0;\n  top: 0;\n  margin: auto;\n  transition: 800ms ease all;\n}\nheader .portfolio-title h1:hover:after {\n  top: inherit;\n  bottom: 0;\n}\nheader .portfolio-title h1:active {\n  transform: scale(1.02);\n}\nheader .repository-link {\n  cursor: pointer;\n  position: absolute;\n  top: 2px;\n  left: 7px;\n  text-decoration: none;\n  display: inline-block;\n  color: #FFF;\n  transition: color ease 0.3s;\n  position: relative;\n}\n@media only screen and (max-width: 640px) {\n  header .repository-link {\n    font-size: 0.65em;\n    top: 0;\n    left: 2px;\n  }\n}\nheader .repository-link:before,\nheader .repository-link:after {\n  content: '';\n  position: absolute;\n  background-color: #61DAFB;\n  height: 2px;\n  left: 0;\n  bottom: -2px;\n}\nheader .repository-link:before {\n  width: 0%;\n  transition: width ease 0.4s;\n}\nheader .repository-link:after {\n  width: 100%;\n  transition: all ease 0.6s;\n}\nheader .repository-link:hover:before {\n  width: 100%;\n}\nheader .repository-link:hover:after {\n  left: 100%;\n  width: 0%;\n  transition: all ease 0.2s;\n}\nheader .menu-links {\n  display: flex;\n  overflow: hidden;\n  justify-content: space-evenly;\n  margin: 0;\n  padding: 18px 0;\n  position: relative;\n}\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  header .menu-links {\n    justify-content: center;\n  }\n}\n@media only screen and (max-width: 640px) {\n  header .menu-links {\n    padding: 12px 0;\n  }\n}\nheader .menu-links:before {\n  content: \"\";\n  position: absolute;\n  width: 60%;\n  background: #61DAFB;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  margin: auto;\n}\nheader .menu-links .link-button {\n  width: calc(100% / 4);\n  display: inline-block;\n  font-size: 1.2em;\n  font-weight: bold;\n  height: 41px;\n  line-height: 41px;\n  padding: 0;\n  background: #61DAFB;\n  color: #222222;\n  border: none;\n  position: relative;\n  cursor: pointer;\n  transition: 800ms ease all;\n  outline: none;\n}\nheader .menu-links .link-button:before,\nheader .menu-links .link-button:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 2px;\n  width: 0;\n  background: #61DAFB;\n  transition: 400ms ease all;\n}\nheader .menu-links .link-button:after {\n  right: inherit;\n  top: inherit;\n  left: 0;\n  bottom: 0;\n}\nheader .menu-links .link-button:hover {\n  background: #222222;\n  color: #61DAFB;\n}\nheader .menu-links .link-button:hover:before,\nheader .menu-links .link-button:hover:after {\n  width: 100%;\n  transition: 800ms ease all;\n}\nheader .menu-links .link-button.active {\n  background: #222222;\n  color: #61DAFB;\n  transform: translateY(20px);\n  pointer-events: none;\n}\nheader .menu-links .link-button.active:before,\nheader .menu-links .link-button.active:after {\n  width: 100%;\n}\n@media only screen and (max-width: 640px) {\n  header .menu-links .link-button.active {\n    transform: translateY(14px);\n  }\n}\n@media only screen and (max-width: 640px) {\n  header .menu-links .link-button {\n    font-size: 0.75em;\n    height: 30px;\n    line-height: 30px;\n  }\n}\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  header .menu-links .link-button {\n    margin: 0 6%;\n  }\n}\nheader .flag-icon {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\nheader .flag-icon:hover {\n  transform: scale(1.1);\n}\nheader .flag-icon .flag-en {\n  background: url("+a+");\n}\nheader .flag-icon .flag-fi {\n  background: url("+r+");\n}\nheader .flag-icon .flag-en,\nheader .flag-icon .flag-fi {\n  cursor: pointer;\n  display: block;\n  width: 35px;\n  height: 25px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  border: none;\n}\n@media only screen and (max-width: 640px) {\n  header .flag-icon .flag-en,\n  header .flag-icon .flag-fi {\n    width: calc(35px / 1.25);\n    height: calc(25px / 1.25);\n  }\n}\nheader .flag-icon .flag-en:disabled,\nheader .flag-icon .flag-fi:disabled {\n  cursor: not-allowed;\n  filter: grayscale(100%);\n}\nmain {\n  margin: 0 10px;\n  overflow: hidden;\n}\n@media only screen and (max-width: 640px) {\n  main {\n    margin: 5px 0;\n  }\n}\nmain .main-content .no-content {\n  animation: fade-in-down 400ms ease-out forwards;\n  border: 2px solid #61DAFB;\n  padding: 2px 0;\n  background: #222222;\n}\n@keyframes fade-in-down {\n  from {\n    clip-path: inset(0 0 100% 0);\n    opacity: 0;\n  }\n  to {\n    clip-path: inset(0 0 0 0);\n    opacity: 1;\n  }\n}\nmain .main-content .projects-list {\n  animation: fade-in-down 800ms ease-out forwards;\n  border: 2px solid #61DAFB;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-wrap: nowrap;\n  padding: 5px;\n  margin: auto;\n}\n@keyframes fade-in-down {\n  from {\n    clip-path: inset(0 0 100% 0);\n    opacity: 0;\n  }\n  to {\n    clip-path: inset(0 0 0 0);\n    opacity: 1;\n  }\n}\n@media only screen and (max-width: 640px) {\n  main .main-content .projects-list {\n    flex-wrap: wrap;\n  }\n}\nmain .main-content .projects-list .project {\n  width: 100%;\n  padding-bottom: 25%;\n  margin: 5px;\n  cursor: pointer;\n  overflow: hidden;\n  position: relative;\n}\n@media only screen and (max-width: 640px) {\n  main .main-content .projects-list .project {\n    width: 50%;\n    padding-bottom: 35%;\n    margin: 1%;\n  }\n}\n@keyframes rotate {\n  100% {\n    transform: rotate(1turn);\n  }\n}\nmain .main-content .projects-list .project:before {\n  content: '';\n  position: absolute;\n  z-index: -2;\n  left: -50%;\n  top: -50%;\n  width: 200%;\n  height: 200%;\n  background-repeat: no-repeat;\n  background-size: 50% 50%, 50% 50%;\n  background-position: 0 0, 100% 0, 100% 100%, 0 100%;\n  background-image: linear-gradient(#61DAFB, #61DAFB), linear-gradient(#000, #000), linear-gradient(#61DAFB, #61DAFB), linear-gradient(#000, #000);\n  animation: rotate 16s linear infinite;\n  pointer-events: none;\n}\nmain .main-content .projects-list .project:hover:before {\n  background-size: 100%;\n  animation-play-state: paused;\n}\nmain .main-content .projects-list .project:after {\n  content: '';\n  position: absolute;\n  z-index: -1;\n  left: 2px;\n  top: 2px;\n  width: calc(100% - 4px);\n  height: calc(100% - 4px);\n  background: #222222;\n  pointer-events: none;\n}\nmain .main-content .projects-list .project:hover:after {\n  background: #3c3c3c;\n  outline: 2px solid #61DAFB;\n}\nmain .main-content .projects-list .project .project-content {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 1.4em;\n}\n@media only screen and (max-width: 640px) {\n  main .main-content .projects-list .project .project-content {\n    font-size: 0.8em;\n  }\n}\nmain .main-content .projects-list .active-project {\n  width: 100%;\n  height: 76.5vh;\n}\nfooter {\n  font-size: 0.9em;\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -30px;\n  margin: 0 10px;\n  width: inherit;\n  border: 2px solid #61DAFB;\n  background: #222222;\n  padding: 5px;\n  display: flex;\n  justify-content: center;\n}\n@media only screen and (max-width: 640px) {\n  footer {\n    margin: 0;\n    bottom: -40px;\n  }\n}\nfooter .last-updated {\n  width: 50%;\n  text-align: left;\n  margin-left: 2.5%;\n}\nfooter .last-updated .underline-animation {\n  transition: color ease 0.3s;\n  position: relative;\n}\nfooter .last-updated .underline-animation:before,\nfooter .last-updated .underline-animation:after {\n  content: '';\n  position: absolute;\n  background-color: #61DAFB;\n  height: 2px;\n  left: 0;\n  bottom: -2px;\n}\nfooter .last-updated .underline-animation:before {\n  width: 0%;\n  transition: width ease 0.4s;\n}\nfooter .last-updated .underline-animation:after {\n  width: 100%;\n  transition: all ease 0.6s;\n}\nfooter .last-updated .underline-animation:hover:before {\n  width: 100%;\n}\nfooter .last-updated .underline-animation:hover:after {\n  left: 100%;\n  width: 0%;\n  transition: all ease 0.2s;\n}\nfooter .icon-container {\n  width: 50%;\n  font-size: 1.5em;\n  text-align: right;\n}\nfooter .icon-container i[class*=\"icon-\"] {\n  cursor: pointer;\n  display: inline-block;\n  margin: 0 5%;\n}\nfooter .icon-container i[class*=\"icon-\"]:hover {\n  transform: scale(1.1);\n}\n",""])}}]);