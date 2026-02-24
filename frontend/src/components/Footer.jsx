import React from 'react'

const Footer = () => {
  return (
    <div id='footer' className='w-full text-amber-50'>
      <ul className='flex sm:flex-row flex-col items-center justify-center sm:gap-10 gap-2 text-md font-mono py-3'>
        <li><a href="https://github.com/ruturaj1010" target='_blank'>Github</a></li>
        <li><a href="https://github.com/ruturaj1010" target='_blank'>X</a></li>
        <li><a href="https://github.com/ruturaj1010" target='_blank'>leetcode</a></li>
        <li>Made with ❤️ by Ruturaj Nikam</li>
        <li>&copy;{new Date().getFullYear()}</li>
      </ul>
    </div>
  )
}

export default Footer;