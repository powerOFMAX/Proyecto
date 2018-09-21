import React from 'react'

const Footer = () => ( 
    <div id='footer'>
        <footer className="text-center footer-style mt-4"> 
            <div className="container">
                <div className="row"> 

                    <div className="col-md-4 footer-col">
                        <h5>About</h5>
                        <p>
                            This is a new blog made as example
                        </p>
                    </div>

                    <div className="col-md-4 footer-col">
                        <a>  MyBlog 2018 ©</a>
                        <a href="http://www.github.com/powerOFMAX"> Github </a>
                    </div>
                    <div className="col-md-4 footer-col">
                        <h5>Contanct</h5>
                        <p>
                            CABA - Argentina <br/>
                            Calle Falsa 400
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    </div>
);

export default Footer;