import React from 'react';
import star from '../images/story_stars_1.png'
import lamby from '../images/lamby_shop.png'
import '../index.css';

/*have email and instagram information in the webpage:
    email: customersupport@thelambyshop.com
    instagram: @thelambyshop
*/
const ContactSection = () => {
  return (
    <div className="main-bg">
      <div className="flex flex-col justify-center items-center min-w-screen min-h-screen -mt-32">
        <header>
          <div className="container mx-auto px-4">
            <div className="flex flex-center justify-center">

              <img src={star} alt="" class="w-16 h-16 mb-4"></img>

              <p class="just-another-hand text-center text-6xl mb-4">
                Contact
              </p>

              <img src={star} alt="" class="w-16 h-16 mb-4"></img>
            </div>
          </div>
        </header>
        <main>
          <div class="just-another-hand text-3xl">
            <span className="block mb-2">
              email: <a href="mailto:email@example.com">customersupport@thelambyshop.com</a>
              <br></br>
              instagram: <a href="https://www.instagram.com/thelambyshop/">thelambyshop</a>
            </span>
          </div>
        </main>

        <div>
          <img src={lamby} alt="" />
        </div>
      </div>
    </div>
  );
}
export default ContactSection;